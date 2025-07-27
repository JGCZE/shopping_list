import React, { useState } from "react";
import { TShopList } from '@/lib/types';
import { useShoppingList } from "@/context/ShoppingListContext";
import {
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItemWrapper from "./component/SortableItemWrapper";
import EditableItem from "./component/EditableItem";
import PurchaseItem from "./component/PurchaseItem";
import useListHook from "./hooks/useList";


const Lists = ({ shoppingList }: { shoppingList: TShopList }) => {
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [editValues, setEditValues] = useState({ name: "", amount: 1 });

  const { deleteItemFromList, updateItemInList, setStatus, updateListItems } = useShoppingList();

  const { handleDragEnd, handleEditItem, handleSaveEdit, sensors } = useListHook({
    editValues,
    setEditingId,
    setEditValues,
    setStatus,
    shoppingList,
    updateListItems,
    updateItemInList,
  });

  if (!shoppingList) {
    return <p className="text-gray-500">Seznam je prázdný.</p>;
  }

  const { name, items } = shoppingList;

  const handleDeleteItem = (itemId: string) => {
    deleteItemFromList(shoppingList.id, itemId);
  };

  const handleCancelEdit = () => {
    setEditingId(undefined);
    setEditValues({ name: "", amount: 1 });
  };

  return (
    <div>
      <h2 className="pb-8">Seznam: {name}</h2>
      {!items?.length && <h3 className="text-gray-500 font-bold">Seznam je prázdný.</h3>}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {items?.map(({ id, name, amount }) => (
              <SortableItemWrapper key={id} id={id} disabled={editingId === id}>
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                  {editingId === id ? (
                    <EditableItem
                      id={id}
                      editValues={editValues}
                      setEditValues={setEditValues}
                      handleSaveEdit={handleSaveEdit}
                      handleCancelEdit={handleCancelEdit}
                      />                    
                  ) : (
                    <PurchaseItem
                      id={id}
                      name={name}
                      amount={amount}
                      handleEditItem={handleEditItem}
                      handleDeleteItem={handleDeleteItem}
                    />
                  )}
                </div>
              </SortableItemWrapper>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Lists;