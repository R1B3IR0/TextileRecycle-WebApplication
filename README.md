# MEAN Stack API

This project is an API developed using the MEAN stack (MongoDB, Express.js, Angular, Node.js) with the goal of demonstrating fullStack development capabilities by integrating different technologies to create a complete web application.

## Overview

The social valorization company “Recicla Têxtil”, in partnership with the environmental fund, aims to enhance the promotion of valorization and recycling of post-consumer textile items. In this context, the development of a web application is required to streamline the collection of textile items that users no longer use for repurposing and sending to social charities and beneficiary institutions. For more details, refer to the [project overview PDF](https://github.com/R1B3IR0/TextileRecycle-WebApplication/blob/master/2024.PAW.TP_AC%20(ENG).pdf).

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

3. Start the server:
    ```bash
    npm start
        or
    nodemon
    ```
The application will be available at `http://localhost:3000`.

4. Navigate to the client directory and install dependencies:
    ```bash
    cd .\Milestone2\app\
    npm install
    ```

5. Start the client:
    ```bash
    ng serve
        or
    nodemon
    ```

The application will be available at `http://localhost:4200`.

Note: Don´t forget to setup the necessary environment variables for: Mongo, Paypal and MailGun.

## License
[MIT] (https://choosealicense.com/licenses/mit/)


