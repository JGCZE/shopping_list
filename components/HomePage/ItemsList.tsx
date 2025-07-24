import Link from "next/link";
import React from "react";
import Button from "../ui/Button";
import { EButtonVariant } from "@/lib/enums";

export type TList = {
  id: number;
  name: string;
  link: string;
};

export interface IProps {
  items: Array<TList>;
}

export const ItemsList = ({ items }: IProps) => {
  return (
    <div>
      {items?.map((item) => (
        <div key={item.id} className="my-4 flex items-center gap-24">
          <Link href={item.link} className="!text-blue-700">
            {item.name}
          </Link>

          <div className="flex items-center justify-end gap-4">
            <Link
              href={`/editList/${item.id}`}
              className="border-1 px-4 rounded-md py-2"
            >
              Upravit
            </Link>

            <Button variant={EButtonVariant.DELETE}>Smazat</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
