"use client";
import CreateForm from "@/components/UpdateForm";
import Items from "@/components/List/Lists";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useShoppingList } from "@/context/ShoppingListContext";
import Status from "@/components/Status";

const List = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug as string);

  const {
    shoppingList,
    saveNewItemsToExistingList,
    status,
    deleteItemFromList,
  } = useShoppingList();

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
        hasWhisperSuggestions
      />

      <Status status={status} />

       {!!currentList && <Items shoppingList={currentList} />}

      <Link href="/" className="w-54 mt-12">
        Zpět na hlavní stránku
      </Link>
    </div>
  );
};

export default List;
