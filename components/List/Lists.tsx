import { EButtonVariant } from "@/lib/enums";
import React, { useState } from "react";
import Button from "../ui/Button";
import { TShopList } from '@/lib/types';
import { useShoppingList } from "@/context/ShoppingListContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Komponenta pro jednotlivou položku
const SortableItem = ({ 
  id, 
  children,
  disabled = false 
}: { 
  id: string; 
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    disabled // Zakázat drag během editace
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {!disabled && (
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 cursor-move p-2" 
          {...attributes} 
          {...listeners}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="text-gray-400">
            <path fill="currentColor" d="M9 3h2v2H9zm0 4h2v2H9zm0 4h2v2H9zm0 4h2v2H9zm0 4h2v2H9zm4-16h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/>
          </svg>
        </div>
      )}
      <div className="pl-10">
        {children}
      </div>
    </div>
  );
};

const Lists = ({ shoppingList }: { shoppingList: TShopList }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ name: "", amount: 1 });
  const { deleteItemFromList, updateItemInList, setStatus, updateListItems } = useShoppingList();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!shoppingList) {
    return <p className="text-gray-500">Seznam je prázdný.</p>;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = shoppingList.items.findIndex((item) => item.id === active.id);
      const newIndex = shoppingList.items.findIndex((item) => item.id === over.id);
      
      const newItems = arrayMove(shoppingList.items, oldIndex, newIndex);
      updateListItems(shoppingList.id, newItems);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    deleteItemFromList(shoppingList.id, itemId);
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

    if (!editValues.name.trim()) {
      setStatus({ status: "error", message: "Název položky nemůže být prázdný." });
      return;
    }

    if (editValues.amount < 1) {
      setStatus({ status: "error", message: "Množství musí být větší než 0." });
      return;
    }

    updateItemInList(shoppingList.id, itemId, editValues);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", amount: 1 });
  };

  return (
    <div>
      <h2>Seznam: {shoppingList.name}</h2>
      {!shoppingList.items?.length && <h3 className="text-gray-500 font-bold">Seznam je prázdný.</h3>}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={shoppingList.items.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {shoppingList.items?.map(({ id, name, amount }) => (
              <SortableItem key={id} id={id} disabled={editingId === id}>
                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
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
                        <strong className="mr-2 text-xl">{name}</strong>
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
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Lists;