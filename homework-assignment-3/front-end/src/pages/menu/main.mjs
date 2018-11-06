import { AuthService } from '/assets/auth.service.mjs'
import { MenuService } from '/assets/menu.service.mjs'

const auth = new AuthService()
const menu = new MenuService(auth)
const menuItemsContainer = document.getElementById('menu-items-container')

const renderMenuItem = menuItem => `
<div>
  <h2>${menuItem.title}</h2>
  <span>$${menuItem.price}</span>
</div>
`
;(async () => {
  const isAuthenticated = auth.isAuthenticated()
  if (!isAuthenticated) location.href = '/sign-in'

  const items = await menu.getMenuItems()
  const html = items.map(renderMenuItem).join('')
  menuItemsContainer.innerHTML = html
})()
