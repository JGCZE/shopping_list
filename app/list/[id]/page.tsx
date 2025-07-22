import Items from '@/components/List/Items'
import Link from 'next/link'
import React from 'react'

const List = () => {
  return (
    <div>
      <h2>Položky seznamu</h2>
      <input type="text" />
      <button>Přidat</button>

      <Items />

      <Link href="/"> Zpět na hlavní stránku</Link> 
    </div>
  )
}

export default List
