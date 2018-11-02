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
