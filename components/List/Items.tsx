import { EButtonVariant } from "@/lib/enums";
import React from "react";
import Button from "../ui/Button";

const mockItems = [
  { id: 1, name: "Rohlíky", amount: 2 },
  { id: 2, name: "Vejce", amount: 0 },
  { id: 3, name: "Chleba", amount: 1 },
];

const Items = ({ items }: { items: Array<Item> }) => {
  return (
    <div>
      {mockItems?.map((item) => (
        <div key={item.id} className="my-4 flex justify-between gap-24 w-1/2">
          <span className="">
            {item.name} ({item.amount})
          </span>

          <div className="flex gap-4">
            <Button variant={EButtonVariant.PRIMARY}>Upravit</Button>
            <Button variant={EButtonVariant.DELETE}>Smazat</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
