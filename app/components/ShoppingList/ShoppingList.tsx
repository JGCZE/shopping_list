import Link from "next/link";
import React from "react";
import { List } from "./components/List";

const ShoppingList = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Nákupní seznamy</h2>
      <Link
        href="/addItem"
        className="border-2 px-10 py-4 block w-40 font-bold"
      >
        Vytvořit
      </Link>

      <List />
    </div>
  );
};

export default ShoppingList;
