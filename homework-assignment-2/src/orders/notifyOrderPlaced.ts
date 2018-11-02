import { OrderData } from './OrderData'
import { User, getUser } from '../users'
import { sendEmail } from './sendEmail'

const buildEmail = (order: OrderData, user: User): string => `
<html>
<body>
<h1>Your order was placed!</h1>
<p>${user.name}, thanks for shopping with us, here's your receipt:</p>
<h2>Receipt</h2>
<ul>
  ${order.items.map(
    item => `
  <li>
    <strong>${item.quantity}x ${item.title}</strong>: ${item.price *
      item.quantity}
  </li>
  `,
  )}
  <li>
    <strong>Total:</strong> ${order.items
      .map(item => item.quantity * item.price)
      .reduce((acc, cur) => acc + cur, 0)}
  </li>
</ul>
</body>
</html>
`

export const notifyOrderPlaced = async (order: OrderData) => {
  const user = await getUser(order.userID)
  const body = buildEmail(order, user)
  const head = {
    subject: 'Order placed.',
    to: [user.email],
  }
  await sendEmail(head, body)
}
