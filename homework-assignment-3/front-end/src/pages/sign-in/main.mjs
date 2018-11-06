import { AuthService } from './auth.service.mjs'

const auth = new AuthService()
const form = document.getElementById('sign-in-form')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const email = form.elements.email.value
  const password = form.elements.password.value

  try {
    await auth.login(email, password)
    alert('logged in, will be redirected')
  } catch (err) {
    alert(err.message)
  }
})
