import { AuthService } from '/assets/auth.service.mjs'

import { LogoComponent } from '/assets/logo.component.mjs'
customElements.define('pizza-logo', LogoComponent)

const auth = new AuthService()
const form = document.getElementById('sign-in-form')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const email = form.elements.email.value
  const password = form.elements.password.value

  try {
    await auth.login(email, password)
    location.href = '/menu'
  } catch (err) {
    alert(err.message)
  }
})
