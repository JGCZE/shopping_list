"use client";
import { generateId, makeUrlFromString } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TShoppingList } from "@/lib/types";

interface IReturn {
  saveNewList: (formData: FormData) => void;
  saveNewItemsToExistingList: (formData: FormData) => void;
  shoppingList: TShoppingList['shoppingList'];
}

const useShoppingList = (decodedSlug: string): IReturn => {
  const [shoppingList, setShoppingList] = useState<TShoppingList['shoppingList']>([]);

  const saveNewList = (formData: FormData) => {
    const formDataItem = formData.get("listItem")?.toString();

    if (!formDataItem?.trim().length) {
      return;
    }

    const newList = {
      id: generateId(),
      name: formDataItem,
      link: `/${makeUrlFromString(formDataItem)}`,
    };

    const existingLists = localStorage.getItem("shoppingList");
    const parsedLists = existingLists ? JSON.parse(existingLists) : [];
    localStorage.setItem(
      "shoppingList",
      JSON.stringify([...parsedLists, newList])
    );
  };

  useEffect(() => {
    loadShoppingList();
  }, []);

  const loadShoppingList = () => {
    const existingLists = localStorage.getItem("shoppingList");
    const parsedLists = existingLists ? JSON.parse(existingLists) : [];

    if (!parsedLists) {
      return [];
    }

    setShoppingList(parsedLists);
  };

  const saveNewItemsToExistingList = () => {
    const filteredList = shoppingList.filter(
      (item) => item.link === `/${decodedSlug}`
    );

    if (!filteredList.length) {
      return;
    }

    // Example of how to add items to the filtered list
    const listOfItems = [{id: 1, name: "Example Item", amount: 1}];

    const updatedList = filteredList.map((item) => ({
      ...item,
      items: listOfItems,
    }));

    console.log("Updated List:", updatedList);
    localStorage.setItem(
      "shoppingList",
      JSON.stringify([...shoppingList.filter(item => item.link !== `/${decodedSlug}`), ...updatedList])
    );
  }
   

  return {
    saveNewList,
    shoppingList,
    saveNewItemsToExistingList,
  };
};

export default useShoppingList;
