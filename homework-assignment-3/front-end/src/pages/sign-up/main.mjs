import { AuthService } from '/assets/auth.service.mjs'
import { UsersService } from '/assets/users.service.mjs'

import { LogoComponent } from '/assets/logo.component.mjs'
customElements.define('pizza-logo', LogoComponent)

const auth = new AuthService()
const users = new UsersService(auth)
const form = document.getElementById('sign-up-form')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const name = form.elements.name.value
  const email = form.elements.email.value
  const password = form.elements.password.value
  const address = form.elements.address.value

  try {
    await users.createUser(name, address, email, password)
    location.href = '/menu'
  } catch (err) {
    alert(err.message)
  }
})
