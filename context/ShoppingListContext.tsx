"use client"
import { TShopList, TShoppingList, TStatus } from "@/lib/types";
import { generateId, makeUrlFromString } from "@/lib/utils";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface IShoppingListContext {
  shoppingList: TShoppingList["shoppingList"];
  status: TStatus;
  saveNewList: (formData: FormData) => void;
  saveNewItemsToExistingList: (formData: FormData, decodedSlug: string) => void;
  updateListName: (id: string, newName: string) => void;
  deleteList: (id: string) => void;
  deleteItemFromList: (listId: string, itemId: string) => void;
  updateItemInList: (listId: string, itemId: string, updates: { name?: string; amount?: number }) => void;
  getAllUniqueItems: () => Array<string>;
  setStatus: (status: TStatus) => void;
  updateListItems: (listId: string, newItems: TShopList['items']) => void;
}

const LOCAL_STORAGE_KEY = "shoppingList";

const ShoppingListContext = createContext<IShoppingListContext | null>(null);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [shoppingList, setShoppingList] = useState<TShoppingList["shoppingList"]>([]);
  const [status, setStatus] = useState<TStatus>({ status: "", message: "" });

  useEffect(() => {
    const existingLists = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (existingLists) {
      const parsedLists: TShoppingList["shoppingList"] = JSON.parse(existingLists);
      if (Array.isArray(parsedLists) && parsedLists.length) {
        setShoppingList(parsedLists);
      } else {
        setShoppingList([]);
      }
    }
  }, []);

  const saveNewList = useCallback((formData: FormData) => {
    const formDataItem = formData.get("listItem")?.toString();
  
    if (!formDataItem?.trim().length) {
      setStatus({ status: "error", message: "Název je povinný" });
      return;
    }
  
    if (shoppingList.some(list => list.name.toLowerCase() === formDataItem.trim().toLowerCase())) {
      setStatus({ status: "error", message: "Seznam s tímto názvem již existuje" });
      return;
    }
  
    const newList = {
      id: generateId(),
      name: formDataItem,
      link: `/${makeUrlFromString(formDataItem)}`,
      items: [],
    };
  
    const updatedLists = [...shoppingList, newList];
    setShoppingList(updatedLists);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
    setStatus({ status: "success", message: "Seznam byl úspěšně přidán" });
  }, [shoppingList]);

  const saveNewItemsToExistingList = useCallback((formData: FormData, decodedSlug: string) => {
    const formItem = formData.get("listItem")?.toString();
    const formAmount = formData.get("listAmount")?.toString() || "1";

    const validAmount = Number(formAmount);

    if (!formItem?.trim()) {
      setStatus({ status: "error", message: "Název položky je povinný" });
      return;
    }

    const currentList = shoppingList.find(list => list.link === `/${decodedSlug}`);
    
    if (currentList?.items.some(item => item.name.toLowerCase() === formItem.trim().toLowerCase())) {
      setStatus({ status: "error", message: "Položka s tímto názvem již existuje" });
      return;
    }

    const createdItemsToList = { id: generateId(), name: formItem, amount: validAmount };

    const updatedLists = shoppingList.map((list) => {
      if (list.link === `/${decodedSlug}`) {
        return {
          ...list,
          items: [...list.items, createdItemsToList],
        };
      }
      return list;
    });

    setShoppingList(updatedLists);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
    setStatus({ status: "success", message: "Položka přidána" });
  }, [shoppingList]);

  const updateListName = useCallback((id: string, newName: string) => {
    if (!newName?.trim()) {
      setStatus({ status: "error", message: "Název je povinný" });
      return;
    }

    if (shoppingList.some(list => list.id !== id && list.name.toLowerCase() === newName.trim().toLowerCase())) {
      setStatus({ status: "error", message: "Seznam s tímto názvem již existuje" });
      return;
    }

    const updatedLists = shoppingList.map(list =>
      list.id === id 
        ? { ...list, name: newName.trim(), link: `/${makeUrlFromString(newName)}` }
        : list
    );

    setShoppingList(updatedLists);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
    setStatus({ status: "success", message: "Seznam přejmenován" });
  }, [shoppingList]);

  const updateItemInList = useCallback((listId: string, itemId: string, updates: { name?: string; amount?: number }) => {
    const updatedLists = shoppingList.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item =>
            item.id === itemId ? { ...item, ...updates } : item
          )
        };
      }
    return list;
  });

  setShoppingList(updatedLists);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
  setStatus({ status: "success", message: "Položka upravena" });
}, [shoppingList]);

const updateListItems = useCallback((listId: string, newItems: TShopList['items']) => {
  const updatedLists = shoppingList.map(list => {
    if (list.id === listId) {
      return { 
        ...list, 
        items: newItems 
      };
    }
    return list;
  });

  setShoppingList(updatedLists);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
}, [shoppingList]);

  const deleteList = useCallback((id: string) => {
    const updatedLists = shoppingList.filter(list => list.id !== id);
    setShoppingList(updatedLists);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
    setStatus({ status: "success", message: "Seznam smazán" });
  }, [shoppingList]);

  const deleteItemFromList = useCallback((listId: string, itemId: string) => {
    const updatedLists = shoppingList.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter(item => item.id !== itemId)
        };
      }
      return list;
    });

    setShoppingList(updatedLists);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
    setStatus({ status: "success", message: "Položka smazána" });
  }, [shoppingList]);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ status: "", message: "" });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const getAllUniqueItems = useCallback(() => {
    const allItems = shoppingList.flatMap(list => list.items);

    const uniqueItems = Array.from(
      new Map(allItems.map(item => [item.name.toLowerCase(), item.name])).values()
    );
  
    return uniqueItems.sort();
  }, [shoppingList]);

  const values = {
    shoppingList,
    status,
    saveNewList,
    updateListName,
    getAllUniqueItems,
    saveNewItemsToExistingList,
    deleteList,
    deleteItemFromList,
    updateItemInList,
    setStatus,
    updateListItems,
  }

  return (
    <ShoppingListContext.Provider value={values}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);

  if (!context) throw new Error("useShoppingList must be used within a ShoppingListProvider");
  
  return context;
};