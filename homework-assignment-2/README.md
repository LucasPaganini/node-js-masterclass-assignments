# Homework Assignment #2

This is the second of several homework assignments from **The Node.js Master Class**. In order to receive my certificate of completion (at the end of the course), I must complete all the assignments and receive a passing grade.

## Installing / Getting started

1. Install dependencies `npm install`.
2. Build the source code `npm run build`.
3. Start the server on localhost:3000 `npm start`.

_You must set some environment variables to run the app, see [all configurations](#configurations)._

## Configuration

### Required environment variables

- STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- MAILGUN_KEY

### Optional environment variables

- MY_EMAIL

## Tests

This codebase is not entirely covered but there is also no need to. You can run the few tests that were written with `npm test`.

## API Reference

### Auth

All requests that require authentication should have an Authorization header with the session token.

Example headers

```json
{
  "Content-Type": "application/json",
  "Authorization": "8222122342"
}
```

#### Login

- Method: POST
- Route: /auth
- Authentication: Yes (user email and password in json body)
- Body payload: Yes

Payload example

```json
{
  "email": "test@test.com",
  "password": "abc123"
}
```

#### Logout

- Method: DELETE
- Route: /auth
- Authentication: Yes
- Body payload: No

### Users

#### Create a user

- Method: POST
- Route: /user
- Authentication: No
- Body payload: Yes

Payload example

```json
{
  "name": "Tester",
  "email": "test@test.com",
  "address": "Test Avenue, 1000",
  "password": "abc123"
}
```

#### Update user data

- Method: PUT
- Route: /user/:id
- Authentication: Yes
- Body payload: Yes

Payload example

```json
{
  "name": "My new name"
}
```

#### Delete user

- Method: DELETE
- Route: /user/:id
- Authentication: Yes
- Body payload: No

#### Get user data

- Method: GET
- Route: /user/:id
- Authentication: Yes
- Body payload: No

### Menu Items

#### Get all menu items

- Method: GET
- Route: /menu-items
- Authentication: Yes
- Body payload: No

### Cart

#### Add one item to cart

- Method: POST
- Route: /cart
- Authentication: Yes
- Body payload: Yes

Payload example

```json
{
  "menuItemID": "1"
}
```

#### Remove one item from cart

- Method: DELETE
- Route: /cart
- Authentication: Yes
- Body payload: Yes

Payload example

```json
{
  "menuItemID": "1"
}
```

#### Get cart data

- Method: GET
- Route: /cart
- Authentication: Yes
- Body payload: No

#### Pay cart items

- Method: POST
- Route: /cart/pay
- Authentication: Yes
- Body payload: Yes

Payload example

```json
{
  "paymentSource": "tok_visa"
}
```
