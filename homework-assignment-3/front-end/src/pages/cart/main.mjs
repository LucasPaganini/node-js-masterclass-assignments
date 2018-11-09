import { AuthService } from '/assets/auth.service.mjs'
import { MenuService } from '/assets/menu.service.mjs'
import { CartService } from '/assets/cart.service.mjs'

const auth = new AuthService()
const cartService = new CartService(auth)
const orderContainer = document.getElementById('order-container')
const orderBody = orderContainer.querySelector('tbody')
const totalDataCell = orderContainer.querySelector('#table-total-price')

const logoutBtn = document.getElementById('logout-btn')

logoutBtn.addEventListener('click', async () => {
  const r = await auth.logout()
})

const renderCartItem = cartItem => {
  // <td>{{ cartItem.title }}</td>
  const title = document.createElement('td')
  title.textContent = cartItem.title

  /**
   * <td>
   *  <span>{{ cartItem.ammount }}</span>
   *  <button>Add</button>
   *  <button>Remove</button>
   * </td>
   */
  const ammount = document.createElement('span')
  ammount.textContent = cartItem.quantity

  const addAmmount = document.createElement('button')
  addAmmount.textContent = 'Add'
  addAmmount.addEventListener('click', async () => {
    await cartService.addItem(cartItem.id)
    location.reload()
  })

  const removeAmmount = document.createElement('button')
  removeAmmount.textContent = 'Remove'
  removeAmmount.addEventListener('click', async () => {
    await cartService.removeItem(cartItem.id)
    location.reload()
  })

  const ammountContainer = document.createElement('td')
  ammountContainer.appendChild(ammount)
  ammountContainer.appendChild(addAmmount)
  ammountContainer.appendChild(removeAmmount)

  // <td>${{ cartItem.price * cartItem.quantity }}</td>
  const price = document.createElement('td')
  price.textContent = '$' + cartItem.price * cartItem.quantity

  // <tr> ... </tr>
  const tr = document.createElement('tr')
  tr.appendChild(title)
  tr.appendChild(ammountContainer)
  tr.appendChild(price)

  return tr
}

;(async () => {
  const isAuthenticated = await auth.isAuthenticated()
  if (!isAuthenticated) location.href = '/sign-in'

  const cart = await cartService.getCart()
  cart.items
    .map(renderCartItem)
    .forEach(element => orderBody.appendChild(element))

  const total = cart.items
    .map(({ price, quantity }) => price * quantity)
    .reduce((acc, cur) => acc + cur, 0)
  totalDataCell.textContent = '$' + total
})()
