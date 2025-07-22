import Link from "next/link";
import React from "react";

const NewList = () => {
  return <div className="flex flex-col gap-6">
    <h2>Vytvoření nového seznamu</h2>

    <div className="flex items-center gap-4">
      <p>nazev </p>
      <input type="text" />
    </div>

    <div className="mt-12 flex items-center gap-4">
      <button>Vytvořit</button>
      <Link href="/" className="border-2 px-4 py-4 rounded-md">Zpět na hlavní stránku</Link>
    </div>
  </div>;
};

export default NewList;
