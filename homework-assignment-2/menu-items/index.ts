export interface MenuItem {
  title: string
  price: number
}

const menuItems: Array<MenuItem> = [
  {
    title: 'Beef',
    price: 50,
  },
  {
    title: 'Salad',
    price: 30,
  },
]

export const getMenuItems = () => Promise.resolve(menuItems)
