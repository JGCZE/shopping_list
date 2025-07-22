import Link from "next/link";
import React from "react";
import { ItemsList } from "./ItemsList";

const ShoppingList = () => {
  return (
    <div className="container">
      <h2>Nákupní seznamy</h2>

      <Link href="/newList" className="border-1 px-4 rounded-md py-2 w-min ">
        Vytvořit
      </Link>

      <ItemsList />
    </div>
  );
};

export default ShoppingList;
