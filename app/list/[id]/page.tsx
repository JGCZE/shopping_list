import Items from "@/components/List/Items";
import Button from "@/components/ui/Button";
import { EButtonVariant } from "@/lib/enums";
import Link from "next/link";
import React from "react";

const List = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Položky seznamu</h2>

      <form action="">
        <input type="text" />
        <Button variant={EButtonVariant.PRIMARY}>Přidat</Button>
      </form>

      <Items />

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default List;
