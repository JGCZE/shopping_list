"use client";
import CreateForm from "@/components/UpdateForm";
import useShoppingList from "@/hooks/useShoppingList";
import Link from "next/link";

const NewList = () => {
  const { saveNewList } = useShoppingList();

  return (
    <div className="container">
      <h2>Vytvoření nového seznamu</h2>

      <CreateForm onChange={saveNewList} />

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default NewList;
