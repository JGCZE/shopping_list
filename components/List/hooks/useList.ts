import { TShopList, TStatus } from "@/lib/types";
import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

interface UseListHookParams {
  editValues: { name: string; amount: number };
  setEditingId: (id: string | undefined) => void;
  setEditValues: (values: { name: string; amount: number }) => void;
  setStatus: (status: TStatus) => void;
  shoppingList: TShopList;
  updateListItems: (listId: string, items: TShopList["items"]) => void;
  updateItemInList: (listId: string, itemId: string, values: { name: string; amount: number }) => void;
}

const useListHook = ({
  editValues,
  setEditingId,
  setEditValues,
  setStatus,
  shoppingList,
  updateListItems,
  updateItemInList,
}: UseListHookParams) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = shoppingList.items.findIndex(
        (item) => item.id === active.id
      );
      const newIndex = shoppingList.items.findIndex(
        (item) => item.id === over.id
      );

      const newItems = arrayMove(shoppingList.items, oldIndex, newIndex);
      updateListItems(shoppingList.id, newItems);
    }
  };

  const handleEditItem = (
    itemId: string,
    currentName: string,
    currentAmount: number
  ) => {
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

    updateItemInList(shoppingList.id, itemId, editValues);
    setEditingId(undefined);
  };

  return {
    handleDragEnd,
    handleEditItem,
    handleSaveEdit,
    sensors,
  };
};

export default useListHook;
