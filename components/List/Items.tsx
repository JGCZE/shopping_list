import React from 'react'

const mockItems = [
  { id: 1, name: "Rohlíky", amount: 2 },
  { id: 2, name: "Vejce", amount: 0 },
  { id: 3, name: "Chleba", amount: 1 },
];

const Items = ({ items }: { items: Array<Item> }) => {
  return (
    <div>
      {mockItems?.map((item) => (
        <div key={item.id} className="my-4 flex items-center gap-24">
          <span className="">{item.name} ({item.amount})</span>
          <div>
            <button className="">Smazat</button>
            <button className="border-2 px-8 py-4">Upravit</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Items
