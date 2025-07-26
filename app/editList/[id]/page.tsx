"use client";
import UpdateForm from "@/components/UpdateForm";
import { useShoppingList } from "@/context/ShoppingListContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const EditList = ({}) => {
  const { id } = useParams();
  const router = useRouter();

  const { shoppingList, updateListName, deleteList } = useShoppingList();

  const currentList = shoppingList.find((item) => item.id === id);

  const handleRename = (formData: FormData) => {
    const newName = formData.get("listItem")?.toString();
    
    if (newName) {
      updateListName(id as string, newName);
    }
  };

  const handleDelete = () => {
    if (confirm("Opravdu chcete smazat tento seznam?")) {
      deleteList(id as string);
      router.push("/");
    }
  };

  if (!currentList) {
    return (
      <div className="container">
        <p>Seznam nenalezen</p>
        <Link href="/">Zpět na hlavní stránku</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Úprava seznamu: {currentList?.name || "Název seznamu"}</h2>
      
      <UpdateForm
        onChange={handleRename}
        deleteButtonName="Smazat"
        onDelete={handleDelete}
        submitButtonName="Přejmenovat"
      />

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default EditList;
