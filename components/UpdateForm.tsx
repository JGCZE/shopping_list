import React, { useState } from "react";
import Button from "./ui/Button";
import { EButtonVariant } from "@/lib/enums";
import { useShoppingList } from "@/context/ShoppingListContext";

interface IProps {
  onChange: (formData: FormData) => void;
  onDelete?: () => void;
  withNumberInput?: boolean;
  deleteButtonName?: string;
  submitButtonName?: string;
  hasWhisperSuggestions?: boolean;
}

const UpdateForm = ({
  onChange,
  onDelete,
  withNumberInput,
  deleteButtonName,
  submitButtonName = "Vytvořit",
  hasWhisperSuggestions = false
}: IProps) => {
  const [itemValue, setItemValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const { getAllUniqueItems } = useShoppingList();
  const allItems = getAllUniqueItems();
  
  const getSuggestions = (searchText: string): string[] => {
    if (!searchText.trim()) return [];
    
    return allItems.filter(item => 
      item.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 5); // Omezit na 5 návrhů
  };
  
  const suggestions = getSuggestions(itemValue);

  const handleSelectSuggestion = (suggestion: string) => {
    setItemValue(suggestion);
    setIsOpen(false);
  };

  return (
  <form action={(data) => onChange(data)} className="flex flex-col gap-3">
    <div className="grid grid-cols-3 mb-4 w-1/2 relative">
      <label htmlFor="listName" className="">nazev </label>
      <div className="col-span-2 relative">
          <input
            type="text"
            id="listName"
            name="listItem"
            value={itemValue}
            className="w-full mb-4"
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false))}
            onChange={(e) => setItemValue(e.target.value)}
            autoComplete="off"
          />

          {isOpen && hasWhisperSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-red-100 border border-red-500 rounded-md shadow-lg z-10 -mt-4">
              <span className="font-bold ml-2"> Mysleli jste? </span>

              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

      {withNumberInput && (
          <>
            <label htmlFor="listAmount">počet </label>
            <input
              type="number"
              id="listAmount"
              name="listAmount"
              min="1"
              defaultValue={1}
              className="col-span-2"
            />
          </>
      )}
    </div>

    <div className="flex gap-6">
      <Button variant={EButtonVariant.PRIMARY} type="submit">
        {submitButtonName}
      </Button>

      {!!deleteButtonName && (
        <Button
          variant={EButtonVariant.DELETE}
          type="button"
          onClick={onDelete}
        >
          {deleteButtonName}
        </Button>
      )}
    </div>
  </form>
  );
}
export default UpdateForm;
