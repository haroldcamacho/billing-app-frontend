# Basic Services Payment App

The Basic Services Payment App is a web application that allows users to manage bill payments, register clients, and retrieve bill information based on categories or client IDs. The app provides a user-friendly interface for interacting with the backend API to perform these tasks.

## Features

1. **Bill Payment**: Users can make bill payments by selecting a client, bill category, and amount. The app validates the input and displays a success message upon successful payment.
2. **Client Registration**: Users can register new clients by providing a client ID and name. The app communicates with the backend to register clients and displays success/failure messages accordingly.
3. **Retrieve Bills by Category**: Users can retrieve bills by specifying a bill category. The app sends a request to the backend to fetch bills of the specified category and displays the results.
4. **Retrieve Bills by Client ID**: Users can retrieve bills associated with a client ID. The app communicates with the backend to fetch bills for the specified client and displays the results.
5. **Retrieve Pending Bills by Client ID**: Users retrieve **pending** bills using a Client ID as input.
6. **Register a Bill**: Users can add any bill to an existing client.

## Getting Started

### Prerequisites

Before running the app, ensure you have the following:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Backend API (Ensure the backend API is up and running)

### Installation

1. Clone the repository:
git clone https://github.com/your-username/basic-services-payment-app.git

2. Navigate to the project directory:
cd basic-services-payment-app
3. Install the dependencies:
npm install

### Running the App

To start the app, run the following command:
npm start

The app will be accessible in your web browser at `http://localhost:3000`.

## Usage

1. **Bill Payment**: Click on the "Pay Bill" button in the navigation to access the bill payment form. Enter the required details and click "Pay Bill" to complete the payment.

2. **Client Registration**: Click on the "Create Client" button in the navigation to access the client registration form. Provide the client ID and name, then click "Register Client" to register a new client.

3. **Retrieve Bills by Category**: Click on the "Fetch Bills by Category" button in the navigation. Enter a valid bill category and click "Fetch Bills" to view bills of that category.

4. **Retrieve Bills by Client ID**: Click on the "Fetch Bills by Client ID" button in the navigation. Enter a valid client ID and click "Fetch Bills" to view bills associated with that client.

5. **Retrieve Pending Bills by Client ID**: Click the "Pending Bills" button and enter your Client ID.

6. **Register a Bill**: Click the "Register Bill" button and add your Client ID, Category, Period (in YYYYMM format) and the amount of the bill.