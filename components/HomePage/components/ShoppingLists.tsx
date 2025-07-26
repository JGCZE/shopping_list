import Link from "next/link";
import Button from "../../ui/Button";
import { EButtonVariant } from "@/lib/enums";
import { TShoppingList } from "@/lib/types";
import { useShoppingList } from "@/context/ShoppingListContext";

const ShoppingLists = ({ shoppingList }: TShoppingList) => {
  const { deleteList } = useShoppingList();

  if (!shoppingList || !shoppingList.length) {
    return <h3 className="text-gray-500 font-extrabold">Žádné nákupní seznamy nebyly nalezeny.</h3>;
  }

  return (
    <div>
      {shoppingList?.map(({id, link, name}) => (
        <div key={id} className="my-6 flex justify-between items-center md:grid md:grid-cols-3 gap-4">
          <Link href={`/list/${link}`} className="!text-blue-700 md:col-span-1 hover:underline">
            {name}
          </Link>

          <div className="flex items-center justify-end gap-2 sm:gap-6 sm:mr-6 md:w-2/3">
            <Link
              href={`/editList/${id}`}
              className="border-1 px-4 rounded-md py-2"
            >
              Upravit
            </Link>

            <Button
              variant={EButtonVariant.DELETE}
              onClick={() => deleteList(id)}
            >
              Smazat
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingLists;
