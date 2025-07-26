"use client";
import UpdateForm from "@/components/UpdateForm";
import { useShoppingList } from "@/context/ShoppingListContext";
import { clsx } from "clsx";
import Link from "next/link";

const NewList = () => {
  const { saveNewList, status } = useShoppingList();

  return (
    <div className="container">
      <h2>Vytvoření nového seznamu</h2>

      {status.message &&
        <p className={clsx({
          "text-red-500": status.status === "error",
          "text-green-500": status.status === "success"
        })}>
          {status.message}
      </p>}

      <UpdateForm onChange={saveNewList} />

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default NewList;
