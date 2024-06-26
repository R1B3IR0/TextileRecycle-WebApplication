# MEAN Stack API

This project is an API developed using the MEAN stack (MongoDB, Express.js, Angular, Node.js) with the goal of demonstrating fullStack development capabilities by integrating different technologies to create a complete web application.

## Overview

The social valorization company “Recicla Têxtil”, in partnership with the environmental fund, aims to enhance the promotion of valorization and recycling of post-consumer textile items. In this context, the development of a web application is required to streamline the collection of textile items that users no longer use for repurposing and sending to social charities and beneficiary institutions. For more details, refer to the [project overview PDF](link-to-your-pdf).

## Technologies Used

- **MongoDB Atlas**: Cloud NoSQL database service used to store data.
- **Express.js**: Web application framework for Node.js used to build the API.
- **Angular**: Front-end framework used to build the user interface.
- **Node.js**: JavaScript runtime environment on the server.
- **Bootstrap**: CSS framework used to style the application.
- **Angular Material**: UI component library for Angular.
- **PayPal**: Integrated for handling payments.
- **Mailgun**: Integrated for sending emails.
- **EJS**: Embedded JavaScript templating used for server-side rendering.

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account and a configured cluster
- PayPal account and API credentials
- Mailgun account and API credentials

### Steps

1. Clone this repository:
    ```bash
    git clone https://github.com/R1B3IR0/TextileRecycle-WebApplication.git
    ```

2. Navigate to the server directory and install dependencies:
    ```bash
    cd .\Milestone1\
    npm install
    ```

3. Configure the `.env` file with the necessary environment variables (example below):
    ```plaintext
    PORT=3000
    MONGO_URI=your-mongodb-atlas-connection-string
    PAYPAL_CLIENT_ID=your-paypal-client-id
    PAYPAL_CLIENT_SECRET=your-paypal-client-secret
    MAILGUN_API_KEY=your-mailgun-api-key
    MAILGUN_DOMAIN=your-mailgun-domain
    ```

4. Start the server:
    ```bash
    npm start
        or
    nodemon
    ```
The application will be available at `http://localhost:3000`.

5. Navigate to the client directory and install dependencies:
    ```bash
    cd .\Milestone2\app\
    npm install
    ```

6. Start the client:
    ```bash
    ng serve
        or
    nodemon
    ```

The application will be available at `http://localhost:4200`.

## License
[MIT] (https://choosealicense.com/licenses/mit/)


