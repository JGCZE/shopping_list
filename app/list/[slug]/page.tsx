"use client";
import CreateForm from "@/components/UpdateForm";
import Items from "@/components/List/Lists";
import useShoppingList from "@/hooks/useShoppingList";
import Link from "next/link";
import { useParams } from "next/navigation";

const List = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug as string);

  const { shoppingList, saveNewItemsToExistingList } =
    useShoppingList(decodedSlug);

  const currentList = shoppingList.find((item) => item.link === `/${decodedSlug}`);

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
        onChange={saveNewItemsToExistingList}
        withNumberInput
      />

       {!!currentList && <Items shoppingList={currentList} />}

      <Link href="/" className="w-54 mt-12">
        Zpět na hlavní stránku
      </Link>
    </div>
  );
};

export default List;
