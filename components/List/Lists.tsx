import { EButtonVariant } from "@/lib/enums";
import React, { useState } from "react";
import Button from "../ui/Button";
import { TShopList } from '@/lib/types';
import { useShoppingList } from "@/context/ShoppingListContext";

const Lists = ({ shoppingList }: { shoppingList: TShopList }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ name: "", amount: 1 });
  const { deleteItemFromList, updateItemInList, setStatus } = useShoppingList();

  if (!shoppingList) {
    return <p className="text-gray-500">Seznam je prázdný.</p>;
  }

  const handleDeleteItem = (itemId: string) => {
    deleteItemFromList(itemId, shoppingList.id);
  };

  const handleEditItem = (itemId: string, currentName: string, currentAmount: number) => {
    setEditingId(itemId);
    setEditValues({ name: currentName, amount: currentAmount });
  };

  const handleSaveEdit = (itemId: string) => {
    const isDuplicate = shoppingList.items.some(item => 
    item.name.toLowerCase() === editValues.name.trim().toLowerCase() && 
    item.id !== itemId
   );

    if (isDuplicate) {
      setStatus({ status: "error", message: "Položka s tímto názvem již v seznamu existuje." });
      return;
    }

    if (editValues.name.trim() && editValues.amount > 0) {
      updateItemInList(shoppingList.id, itemId, editValues);
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", amount: 1 });
  };


  return (
    <div>
      <h2>seznam: {shoppingList.name}</h2>
      {!shoppingList.items?.length && <h3 className="text-gray-500 font-bold">Seznam je prázdný.</h3>}

       <div className="flex flex-col">
        {shoppingList.items?.map(({ id, name, amount }) => (
          <div key={id} className="my-4 flex justify-between items-center w-full">
            {editingId === id ? (
              <>
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    className="border rounded px-2 py-1"
                    autoFocus
                  />
                  <input
                    type="number"
                    value={editValues.amount}
                    onChange={(e) => setEditValues({ ...editValues, amount: Number(e.target.value) })}
                    className="border rounded px-2 py-1 w-20"
                    min="1"
                  />
                  <span>kusů</span>
                </div>
                
                <div className="gap-2 flex">
                  <Button
                    variant={EButtonVariant.PRIMARY}
                    onClick={() => handleSaveEdit(id)}
                  >
                    Uložit
                  </Button>
                  <Button
                    variant={EButtonVariant.DELETE}
                    onClick={handleCancelEdit}
                  >
                    Zrušit
                  </Button>
                </div>
              </>
            ) : (
              <>
                <span>
                  <strong className="mr-2 text-xl">{name} </strong>
                  {amount} kusů
                </span>
                
                <div className="gap-2 flex">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;
