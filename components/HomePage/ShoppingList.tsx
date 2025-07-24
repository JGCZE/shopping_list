"use client";
import Link from "next/link";
import React from "react";
import { ItemsList } from "./ItemsList";
import useShoppingList from "@/hooks/useShoppingList";

const ShoppingList = () => {
  const { list } = useShoppingList();

  return (
    <div className="container">
      <h2>Nákupní seznamy</h2>

      <Link href="/newList" className="border-1 px-4 rounded-md py-2 w-min ">
        Vytvořit
      </Link>

      <ItemsList items={list} />
    </div>
  );
};

export default ShoppingList;
