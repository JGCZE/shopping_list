"use client";
import CreateForm from "@/components/UpdateForm";
import Items from "@/components/List/Lists";
import Link from "next/link";
import { useParams } from "next/navigation";
import clsx from "clsx";
import { useShoppingList } from "@/context/ShoppingListContext";

const List = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug as string);

  const { shoppingList, saveNewItemsToExistingList, status } =
    useShoppingList();

  const currentList = shoppingList.find((item) => item.link === `/${decodedSlug}`);

  const handleAddNewItem = (formData: FormData) => {
    saveNewItemsToExistingList(formData, decodedSlug);
  };

  if (!currentList) {
    return (
     <>
      <div>Seznam nenalezen</div>
      <Link href="/" className="w-54">
        Zpět na hlavní stránku
      </Link>
     </>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2>Položky seznamu</h2>

      <CreateForm
        onChange={handleAddNewItem}
        withNumberInput
      />

      {status.message &&
        <p className={clsx({
           "text-red-500": status.status === "error",
           "text-green-500": status.status === "success"
         })}>
           {status.message}
        </p>}

       {!!currentList && <Items shoppingList={currentList} />}

      <Link href="/" className="w-54 mt-12">
        Zpět na hlavní stránku
      </Link>
    </div>
  );
};

export default List;
