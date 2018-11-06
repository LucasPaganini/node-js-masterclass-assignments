import { AuthService } from '/assets/auth.service.mjs'

const auth = new AuthService()

auth.isAuthenticated().then(isAuthenticated => {
  if (!isAuthenticated) location.href = '/sign-in'
})
