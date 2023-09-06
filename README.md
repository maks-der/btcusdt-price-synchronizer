# Prices synchronizer

## Description
This is a `TypeScript` project for synchronizing currencies prices using the `Binance API`.
It is built with the `Nest.js` framework and includes `GraphQL` functionality for retrieving and managing price data.

You choose currencies via adding to `CURRENCIES` variable in `.env`.

Cron job retrieves data from API and saves in database once per minute.

While server runs you can check GraphQL sandbox: http://localhost:3000/graphql

or simple web-client: http://localhost:3000

## Installation

To run this project locally, you will need Node.js and npm installed on your machine.

1. Clone this repository:

   ```bash
   git clone https://github.com/maks-der/btcusdt-price-synchronizer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd btcusdt-price-synchronizer
   ```

3. Create a `.env` file in the project root or copy it from `example.env`:

   ```
   APP_PORT=3000
   CURRENCIES=BTCUSDT;DOGEUSDT;APEUSDT
   JWT_SECRET=jwt-secret-string

   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=root
   DB_PASS=secret
   DB_NAME=price-synchronizer
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Database
To start the database using Docker Compose (ensure Docker is installed):

```bash
npm run start:db
```

### Development Server
To start the development server with watch mode:

```bash
npm run start:dev
```

### Production
To build and start the production server:

```bash
npm run build
npm run start:prod
```

### Testing
To run tests:

```bash
npm test
```

## API overview
1. **`login` (Query):**
    - **Input Parameters:**
        - `email` (String): The email address of the user attempting to log in.
        - `password` (String): The password associated with the user's account.
    - **Description:** This query is used for user authentication. If the provided credentials are valid, it returns an `accessToken`.

   **Example:**
   ```graphql
   query {
     login(email: "test@example.com", password: "secret") {
       accessToken
     }
   }
   ```

2. **`register` (Mutation):**
    - **Input Parameters:**
        - `fullName` (String): The full name of the user to be registered.
        - `email` (String): The email address the user wishes to use for registration.
        - `password` (String): The desired password for the new account.
    - **Description:** This mutation is used to create a new user account. If the registration is successful, it returns an `accessToken`


   **Example:**
   ```graphql
   mutation {
     register(fullName: "Test", email: "test@example.com", password: "secret") {
       accessToken
     }
   }
   ```

3. **`current` Query:**
    - **Input Parameters:**
        - `currency` (String): The currency pair for which the current price is being requested. In this case, it is set to "BTCUSDT."
    - **Description:** This query is used to fetch the current price information for the specified currency pair.
        - `id` (String): A unique identifier for the price record.
        - `price` (Float): The current price of the currency pair.
        - `currency` (String): The currency pair being queried.
        - `createdAt` (DateTime): The timestamp when the price record was created.
        - `updatedAt` (DateTime): The timestamp when the price record was last updated.

   **Example:**
   ```graphql
   query {
     current(currency: "BTCUSDT") {
       id
       price
       currency
       createdAt
       updatedAt
     }
   }
   ```

4. **`history` Query:**
    - **Input Parameters:**
        - `currency` (String): The currency pair for which historical price data is being requested.
    - **Description:** This query is used to retrieve historical price information for the specified currency pair

   **Example:**
   ```graphql
   query {
     history(currency: "ETHUSDT") {
       id
       price
       currency
       createdAt
       updatedAt
     }
   }
   ```