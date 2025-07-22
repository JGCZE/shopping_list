import Link from "next/link";
import React from "react";
import { List } from "./components/List";

const ShoppingList = () => {
  return (
    <>
      <h2>Nákupní seznamy</h2>
      <Link
        href="/newList"
        className="border-2 px-4 py-4 rounded-md"
      >
        Vytvořit
      </Link>

      <List />
    </>
  );
};

export default ShoppingList;
