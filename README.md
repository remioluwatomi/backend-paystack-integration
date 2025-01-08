# Backend Payment Integration with Paystack

A backend service for securely initializing payments using the Paystack Payment Gateway. This project demonstrates how to integrate payment functionality on the backend while ensuring secure handling of sensitive data like API keys and customer details.

---

## Features

- Secure integration of the Paystack Payment Gateway.
- Backend endpoint for initializing transactions.
- Currency conversion using the [CurrencyAPI](https://currencyapi.com/).
- Validation of payment details (email and amount).
- Error handling for invalid inputs and request failures.

---

## Technologies Used

- **Node.js** with **Express.js** for building the backend.
- **Paystack API** for payment integration.
- **CurrencyAPI** for real-time currency conversion.

---

## Installation

1. Clone this repository:

   ````bash
   git clone https://github.com/remioluwatomi/backend-paystack-integration.git

   cd backend-paystack-integration```

   ````

2. Install dependencies:

   ````bash
   npm install```

   ````

3. Create a .env file in the project root and add the following environment variables::

   ````.env
    PORT=3200
    PAYSTACK_SECRET_KEY=your-paystack-secret-key
    FX_API_KEY=your-currencyapi-key
    ALLOWED_SERVER=frontend-application-url-utilizing-this-service```

   ````

4. Start the development server::
   ````bash
   npm START```
   ````

## Endpoints

### `POST /initialize-payment`

Initializes a payment transaction with Paystack.

#### Request Body:

```json
{
  "amount": "amount-in-base-currency",
  "email": "customer-email"
}
```

### Response:

- Success:

```json
{
  "status": true,
  "message": "successful",
  "data": { ...transaction-details }
}
```

- Failure:

```json
{
  "status": false,
  "message": "unsuccessful"
}
```

## Disclaimer:

This project is intended for educational purposes only. It demonstrates how to integrate backend payment functionality with Paystack and is not production-ready. Use this code as a reference or starting point for your own secure implementation.

## License

This project is licensed under the **MIT License**.
