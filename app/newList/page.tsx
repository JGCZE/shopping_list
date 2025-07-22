import Button from "@/components/ui/Button";
import { EButtonVariant } from "@/lib/enums";
import Link from "next/link";
import React from "react";

const NewList = () => {
  return (
    <div className="container">
      <h2>Vytvoření nového seznamu</h2>

      <div className="flex items-center gap-4">
        <p>nazev </p>
        <input type="text" />
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <Button variant={EButtonVariant.PRIMARY}>Vytvořit</Button>
      </div>

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default NewList;
