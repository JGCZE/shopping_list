"use client";
import Status from "@/components/Status";
import UpdateForm from "@/components/UpdateForm";
import { useShoppingList } from "@/context/ShoppingListContext";
import Link from "next/link";

const NewList = () => {
  const { saveNewList, status } = useShoppingList();

  return (
    <div className="container">
      <h2>Vytvoření nového seznamu</h2>

      <Status status={status} />

      <UpdateForm onChange={saveNewList} />

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default NewList;
