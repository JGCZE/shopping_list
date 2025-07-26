import { EButtonVariant } from "@/lib/enums";
import React from "react";
import Button from "../ui/Button";
import { TShopList } from '@/lib/types';

const Lists = ({ shoppingList }: { shoppingList: TShopList }) => {

  if (!shoppingList) {
    return <p className="text-gray-500">Seznam je prázdný.</p>;
  }

  return (
    <div>
      <h2>{shoppingList.name}</h2>
      {!shoppingList.items?.length && <h3 className="text-gray-500 font-bold">Seznam je prázdný.</h3>}

      <div className="flex flex-col">
        {shoppingList.items?.map(({ id, name, amount }) => (
          <div key={id} className="my-4 flex justify-between gap-24 w-1/2">
            <span>
              <strong className="mr-2">{name} - </strong>
              {amount} X
            </span>

            <div className="flex gap-4">
              <Button variant={EButtonVariant.DELETE}>Smazat</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;
