import Link from "next/link";
import React from "react";
import Button from "../../ui/Button";
import { EButtonVariant } from "@/lib/enums";
import { TShoppingList } from "@/lib/types";

const ShoppingLists = ({ shoppingList }: TShoppingList) => {
  // todo loading sate
  // todo error state

  return (
    <div>
      {shoppingList?.map(({id, link, name}) => (
        <div key={id} className="my-4 flex items-center gap-24">
          <Link href={`/list/${link}`} className="!text-blue-700">
            {name}
          </Link>

          <div className="flex items-center justify-end gap-4">
            <Link
              href={`/editList/${id}`}
              className="border-1 px-4 rounded-md py-2"
            >
              Upravit
            </Link>

            <Button variant={EButtonVariant.DELETE}>Smazat</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingLists;
