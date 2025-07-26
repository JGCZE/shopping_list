"use client";
import { generateId, makeUrlFromString } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { TShoppingList, TStatus } from "@/lib/types";

interface IReturn {
  saveNewList: (formData: FormData) => void;
  saveNewItemsToExistingList: (formData: FormData) => void;
  shoppingList: TShoppingList["shoppingList"];
  handleDeleteList: (id: string) => void;
  deleteItemFromList: (listId: string, itemId: string) => void;
  status: TStatus;
}

const useShoppingList = (decodedSlug?: string): IReturn => {
  const [shoppingList, setShoppingList] = useState<TShoppingList["shoppingList"]>([]);
  const [status, setStatus] = useState<TStatus>({ status: "", message: "" });

  const saveNewList = useCallback((formData: FormData) => {
    const formDataItem = formData.get("listItem")?.toString();

    if (!formDataItem?.trim().length) {
      return;
    }

    const existingLists = localStorage.getItem("shoppingList");
    const parsedLists: TShoppingList["shoppingList"] = existingLists ? JSON.parse(existingLists) : [];

    if (parsedLists.some((list) => list.name.toLowerCase() === formDataItem.toLowerCase())) {
      setStatus({ status: "error", message: "Položka s tímto názvem již existuje" });
      return;
    }

    const newList = {
      id: generateId(),
      name: formDataItem,
      link: `/${makeUrlFromString(formDataItem)}`,
      items: [],
    };

    const updatedLists = [...parsedLists, newList];

    localStorage.setItem("shoppingList", JSON.stringify(updatedLists));
    console.log("Updated Lists after adding new list:", updatedLists);
    //setShoppingList(updatedLists);
  }, []);

  useEffect(() => {
    // Loading all of the shopping lists from localStorage
    const existingLists = localStorage.getItem("shoppingList");
    const parsedLists = existingLists ? JSON.parse(existingLists) : [];
    setShoppingList(parsedLists);
  }, []);

  const saveNewItemsToExistingList = useCallback((formData: FormData) => {
    const formItem = formData.get("listItem")?.toString();
    const formAmount = formData.get("listAmount")?.toString() || "1";

    const validAmount = Number(formAmount);

    if (!formItem?.trim().length || !validAmount) {
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
    localStorage.setItem("shoppingList", JSON.stringify(updatedLists));
  }, [shoppingList, decodedSlug]);

  const handleDeleteList = useCallback((id: string) => {
    const updatedLists = shoppingList.filter(list => list.id !== id);

    localStorage.setItem("shoppingList", JSON.stringify(updatedLists));
    window.location.reload();
  }, [shoppingList]);
 
  const deleteItemFromList = useCallback((itemId: string, listId: string) => {
    const existingLists = localStorage.getItem("shoppingList");
    const parsedLists: TShoppingList["shoppingList"] = existingLists ? JSON.parse(existingLists) : [];

    const updatedLists = parsedLists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter(item => item.id !== itemId)
        };
      }
      return list;
    });

    setShoppingList(updatedLists);
    localStorage.setItem("shoppingList", JSON.stringify(updatedLists));
    window.location.reload();
  }, []);

  return {
    saveNewList,
    shoppingList,
    saveNewItemsToExistingList,
    handleDeleteList,
    deleteItemFromList,
    status,
  };
};

export default useShoppingList;
