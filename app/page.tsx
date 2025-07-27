"use client"
import Link from "next/link";
import { useShoppingList } from "@/context/ShoppingListContext";
import ShoppingLists from "@/components/HomePage/ShoppingLists";

const Home = () =>  {
  const { shoppingList } = useShoppingList();

  return (
    <div className="container">
      <h2>Nákupní seznamy</h2>

      <Link href="/newList" className="border-1 px-4 rounded-md my-6 py-2 w-40">
        Vytvořit seznam
      </Link>

      <ShoppingLists shoppingList={shoppingList} />
    </div>
  );
};

export default Home;