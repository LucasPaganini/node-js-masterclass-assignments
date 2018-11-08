import { AuthService } from '/assets/auth.service.mjs'
import { MenuService } from '/assets/menu.service.mjs'
import { CartService } from '/assets/cart.service.mjs'

const auth = new AuthService()
const menu = new MenuService(auth)
const cart = new CartService(auth)
const menuItemsContainer = document.getElementById('menu-items-container')

const renderMenuItem = menuItem => {
  // <h2>{{ menuItem.title }}</h2>
  const title = document.createElement('h2')
  title.textContent = menuItem.title

  // <span>${{ menuItem.price }}</span>
  const span = document.createElement('span')
  span.textContent = '$' + menuItem.price

  // <button>Add to cart</button>
  const button = document.createElement('button')
  button.textContent = 'Add to cart'
  button.addEventListener('click', async () => {
    const cartData = await cart.addItem(menuItem.id)
  })

  // <div> ... </div>
  const div = document.createElement('div')
  div.appendChild(title)
  div.appendChild(span)
  div.appendChild(button)

  return div
}

;(async () => {
  const isAuthenticated = await auth.isAuthenticated()
  if (!isAuthenticated) location.href = '/sign-in'

  const items = await menu.getMenuItems()
  items
    .map(renderMenuItem)
    .forEach(element => menuItemsContainer.appendChild(element))
})()
