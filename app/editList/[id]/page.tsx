"use client";
import UpdateForm from "@/components/UpdateForm";
import useShoppingList from "@/hooks/useShoppingList";
import { TShopList } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditList = ({}) => {
  const { id } = useParams();
  const [currentList, setCurrentList] = useState<Array<TShopList>>([]);
  const { shoppingList } = useShoppingList();
  
  
  useEffect(() => {
    if (id && shoppingList) {
      const currentList = shoppingList.filter((item) => item.id === id);

      if (!currentList.length) {
        return;
      }

      setCurrentList(currentList);
    }
  }, [id, shoppingList]);


  const handleRename = (formData: FormData) => {
    const newName = formData.get("listItem")?.toString();

    const updateCurrentList = currentList.map((item) => {
      return { ...item, name: newName || item.name };
    });

    const removedOldList = shoppingList.filter((item) => item.id !== id);
    console.log("removedOldList", removedOldList);
    console.log("removedOldList", updateCurrentList);

    localStorage.setItem("shoppingList", JSON.stringify([...removedOldList, ...updateCurrentList]));
    setCurrentList(updateCurrentList);
  };

  return (
    <div className="container">
      <h2>Úprava seznamu: {currentList?.[0]?.name || "Název seznamu"}</h2>
      
      <UpdateForm onChange={handleRename} deleteButtonName="Smazat" />

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default EditList;
