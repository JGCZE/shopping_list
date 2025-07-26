"use client";
import Link from "next/link";
import React from "react";
import ShoppingLists from "./components/ShoppingLists";
import { useShoppingList } from "@/context/ShoppingListContext";

const ShoppingListsOverview = () => {
  const { shoppingList } = useShoppingList();

  return (
    <div className="container">
      <h2>Nákupní seznamy</h2>

      <Link href="/newList" className="border-1 px-4 rounded-md my-6 py-2 w-min ">
        Vytvořit
      </Link>

      <ShoppingLists shoppingList={shoppingList} />
    </div>
  );
};

export default ShoppingListsOverview;
