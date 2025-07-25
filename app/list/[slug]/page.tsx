"use client"
import CreateForm from "@/components/CreateForm";
import Items from "@/components/List/Items";
import useShoppingList from "@/hooks/useShoppingList";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const List = () => {
  const params = useParams();
  const decodedSlug = decodeURIComponent(params.slug as string);

  const { shoppingList, saveNewItemsToExistingList } = useShoppingList(decodedSlug);





  return (
    <div className="flex flex-col gap-4">
      <h2>Položky seznamu</h2>
      <p>{}</p>

      <CreateForm saveNewList={saveNewItemsToExistingList} />

      {!shoppingList.length ? (
        <p className="text-gray-500">Seznam je prázdný.</p>
      ) : (
        <Items list={shoppingList} />
      )}

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default List;
