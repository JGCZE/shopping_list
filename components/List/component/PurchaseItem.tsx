import Button from "@/components/ui/Button";
import { EButtonVariant } from "@/lib/enums";
import React from "react";

interface IProps {
  amount: number;
  handleDeleteItem: (id: string) => void;
  handleEditItem: (id: string, name: string, amount: number) => void;
  id: string;
  name: string;
}

const PurchaseItem = ({
  amount,
  handleDeleteItem,
  handleEditItem,
  id,
  name,
}: IProps) => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-center">
      <strong className="sm:mr-2 sm:text-xl">{name}</strong>
      <div>
        {amount} kusů
      </div>
    </div>

    <div className="sm:gap-2 flex">
      <Button
        variant={EButtonVariant.PRIMARY}
        onClick={() => handleEditItem(id, name, amount)}
      >
        Upravit
      </Button>
      <Button
        variant={EButtonVariant.DELETE}
        onClick={() => handleDeleteItem(id)}
      >
        Smazat
      </Button>
    </div>
  </>
);

export default PurchaseItem;
