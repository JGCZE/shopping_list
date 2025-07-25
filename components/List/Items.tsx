import { EButtonVariant } from "@/lib/enums";
import React from "react";
import Button from "../ui/Button";
import { TItemsList } from "@/lib/types";

const Items = ({ items }: TItemsList) => {
  return (
    <div>
      {items?.map((item) => (
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
