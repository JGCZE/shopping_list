import Link from "next/link";
import React from "react";

export type TItem = {
  id: number;
  name: string;
  link: string;
};

interface IProps {
  mockItems: Array<TItem>;
}

export const List = ({}: IProps) => {
  const mockItems: Array<TItem> = [
    { id: 1, name: "Můj nákupní seznam 1", link: "/list/1" },
    { id: 2, name: "Můj nákupní seznam 2", link: "/list/2" },
    { id: 3, name: "Můj nákupní seznam 3", link: "/list/3" },
  ];

  return (
    <div>
      {mockItems?.map((item) => (
        <div key={item.id} className="my-4 grid grid-cols-3 gap-4">
          <Link href={item.link} className="font-bold text-blue-500">
            {item.name}
          </Link>

          <div className="flex justify-end gap-4 ">
            <button>
              <Link href={item.link} className="">
                Editovat
              </Link>
            </button>

            <button className="">Smazat</button>
          </div>
        </div>
      ))}
    </div>
  );
};
