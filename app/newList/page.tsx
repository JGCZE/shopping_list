"use client";
import Button from "@/components/ui/Button";
import useShoppingList from "@/hooks/useShoppingList";
import { EButtonVariant } from "@/lib/enums";
import Link from "next/link";

const NewList = () => {
  const { saveNewList } = useShoppingList();

  const handleNewList = (formData: FormData) => {
    saveNewList(formData);
  };

  return (
    <div className="container">
      <h2>Vytvoření nového seznamu</h2>

      <form
        action={(data) => handleNewList(data)}
        className="flex flex-col gap-4"
      >
        <div className="mb-4">
          <label htmlFor="listName">nazev </label>
          <input type="text" id="listName" name="listItem" />
        </div>

        <Button variant={EButtonVariant.PRIMARY} type="submit">
          Vytvořit
        </Button>
      </form>

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default NewList;
