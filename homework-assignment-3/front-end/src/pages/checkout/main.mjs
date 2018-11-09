import { AuthService } from '/assets/auth.service.mjs'
import { CartService } from '/assets/cart.service.mjs'

import { LogoComponent } from '/assets/logo.component.mjs'
customElements.define('pizza-logo', LogoComponent)

const auth = new AuthService()
const cartService = new CartService(auth)

const orderContainer = document.getElementById('order-container')
const orderBody = orderContainer.querySelector('tbody')
const totalDataCell = orderContainer.querySelector('#table-total-price')
const logoutBtn = document.getElementById('logout-btn')
const form = document.getElementById('checkout-form')

logoutBtn.addEventListener('click', () => auth.logout())

const renderCartItem = cartItem => {
  // <td>{{ cartItem.title }}</td>
  const title = document.createElement('td')
  title.textContent = cartItem.title

  // <td>{{ cartItem.quantity }}</td>
  const ammount = document.createElement('span')
  ammount.textContent = cartItem.quantity

  // <td>${{ cartItem.price * cartItem.quantity }}</td>
  const price = document.createElement('td')
  price.textContent = '$' + cartItem.price * cartItem.quantity

  // <tr> ... </tr>
  const tr = document.createElement('tr')
  tr.appendChild(title)
  tr.appendChild(ammount)
  tr.appendChild(price)

  return tr
}

form.addEventListener('submit', async e => {
  e.preventDefault()

  const name = form.elements.name.value
  const cardNumber = form.elements.number.value
  const expiration = form.elements.expiration.value
  const cvv = form.elements.cvv.value
  const orderVerified = form.elements['order-verified'].checked

  if (!orderVerified)
    return alert('Verify your order before confirming payment')

  try {
    await cartService.pay('tok_visa')
    location.href = '/menu'
  } catch (err) {
    alert(err.message)
  }
})
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
