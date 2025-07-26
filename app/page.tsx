"use client"
import Link from "next/link";
import { useShoppingList } from "@/context/ShoppingListContext";
import ShoppingLists from "@/components/HomePage/components/ShoppingLists";

const Home = () =>  {
  const { shoppingList } = useShoppingList();
  console.log("shoppingList", shoppingList);

  return (
    <div className="container">
      <h2>Nákupní seznamy</h2>

      <Link href="/newList" className="border-1 px-4 rounded-md my-6 py-2 w-min">
        Vytvořit
      </Link>

      <ShoppingLists shoppingList={shoppingList} />
    </div>
  );
};

export default Home;