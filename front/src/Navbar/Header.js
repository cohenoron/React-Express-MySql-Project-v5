import React, { useState, useContext, useEffect } from 'react'
import Menu from './Menu'
import Categories from './Categories'
import { context } from '../App'

function Header() {
  const { items, openAboutModal } = useContext(context)
  const allCategories = ['all', ...new Set(items.map((item) => item.category))]
  const [menuItems, setMenuItems] = useState(items)
  const [categories, setCategories] = useState(allCategories)

  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(items)
      return
    }
    const newItems = items.filter((item) => item.category === category)
    setMenuItems(newItems)
  }

  
  useEffect(() => {
    setCategories(allCategories)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  return (
    <main>
      <section className="menu section">
        {!openAboutModal && (
          <Categories categories={categories} filterItems={filterItems} />
        )}
        {!openAboutModal && <Menu menuItems={menuItems} />}
        <div className="underline"></div>
      </section>
    </main>
  )
}

export default Header
