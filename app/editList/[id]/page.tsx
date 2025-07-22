import Button from "@/components/ui/Button";
import { EButtonVariant } from "@/lib/enums";
import Link from "next/link";
import React from "react";

const EditList = ({}) => {
  return (
    <div className="container">
      <h2>Úprava seznamu</h2>

      <div>
        <form>
          <label htmlFor="listName" className="mr-4">
            Název
          </label>
          <input type="text" id="listName" name="listName" />

          <div className="flex gap-4 mt-8">
            <Button type="submit" variant={EButtonVariant.PRIMARY}>
              upravit
            </Button>

            <Button type="submit" variant={EButtonVariant.DELETE}>
              smazat
            </Button>
          </div>
        </form>
      </div>

      <Link href="/">Zpět na hlavní stránku</Link>
    </div>
  );
};

export default EditList;
