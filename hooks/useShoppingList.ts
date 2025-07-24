"use client";
import { generateId, makeUrlFromString } from "@/lib/utils";
import { use, useEffect, useState } from "react";
import { IProps } from "@/components/HomePage/ItemsList";

const useShoppingList = () => {
  const [list, setList] = useState<Array<IProps>>([]);

  const saveNewList = (formData: FormData) => {
    const formDataItem = formData.get("listItem")?.toString();

    if (!formDataItem?.trim().length) {
      return;
    }

    const newList = {
      id: generateId(),
      name: formDataItem,
      link: `/list/${makeUrlFromString(formDataItem)}`,
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

    setList(parsedLists);
  };

  return {
    saveNewList,
    list,
  };
};

export default useShoppingList;
