"use client";
import { generateId, makeUrlFromString } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { TShoppingList } from "@/lib/types";

interface IReturn {
  saveNewList: (formData: FormData) => void;
  saveNewItemsToExistingList: (formData: FormData) => void;
  shoppingList: TShoppingList["shoppingList"];
}

const useShoppingList = (decodedSlug?: string): IReturn => {
  const [shoppingList, setShoppingList] = useState<TShoppingList["shoppingList"]>([]);

  const saveNewList = useCallback((formData: FormData) => {
    const formDataItem = formData.get("listItem")?.toString();

    if (!formDataItem?.trim().length) {
      return;
    }

    const newList = {
      id: generateId(),
      name: formDataItem,
      link: `/${makeUrlFromString(formDataItem)}`,
      items: [],
    };

    const existingLists = localStorage.getItem("shoppingList");
    const parsedLists = existingLists ? JSON.parse(existingLists) : [];
    const updatedLists = [...parsedLists, newList];

    localStorage.setItem("shoppingList", JSON.stringify(updatedLists));
    setShoppingList(updatedLists);
  }, []);

  useEffect(() => {
    // Loading all of the shopping lists from localStorage
    const existingLists = localStorage.getItem("shoppingList");
    const parsedLists = existingLists ? JSON.parse(existingLists) : [];
    setShoppingList(parsedLists);
  }, []);

  const saveNewItemsToExistingList = useCallback((formData: FormData) => {
    console.log("decodedSlug TEXT");
    const formItem = formData.get("listItem")?.toString();
    const formAmount = formData.get("listAmount")?.toString() || "1";

    const validAmount = Number(formAmount);

    if (!formItem?.trim().length || !validAmount) {
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

  return {
    saveNewList,
    shoppingList,
    saveNewItemsToExistingList,
  };
};

export default useShoppingList;
