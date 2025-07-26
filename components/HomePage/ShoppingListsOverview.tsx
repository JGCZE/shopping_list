"use client";
import Link from "next/link";
import React from "react";
import useShoppingList from "@/hooks/useShoppingList";
import ShoppingLists from "./components/ShoppingLists";

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
