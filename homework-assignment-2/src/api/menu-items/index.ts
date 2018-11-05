export interface MenuItem {
  id: string
  title: string
  price: number
}

const menuItems: Array<MenuItem> = [
  {
    id: '1',
    title: 'Beef',
    price: 50,
  },
  {
    id: '2',
    title: 'Salad',
    price: 30,
  },
]

export const getMenuItems = () => Promise.resolve(menuItems)

export const getMenuItem = async (id: string): Promise<MenuItem> => {
  const items = await getMenuItems()
  const item = items.find(i => i.id === id)
  if (item === undefined)
    throw new Error(`No menu item found with the id "${id}"`)
  return item
}
