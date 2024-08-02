const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const userRouter = require('./users/user.router');
const CompanyRouter = require("./company/company.router")
const cors = require('cors');
const logger = require('./logs/logger');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee Management Portal',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
        tags: [
            {
                name: "Authorization",
                description: 'Login here'
            },
            {
                name: 'Users',
                description: 'Operations about users'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
    },
    apis: ['./users/user.router.js']
};

const swaggerSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/users', userRouter);
app.use('/company',CompanyRouter)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//Setup for twilio account

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const sendSMS = (to, body) => {
  client.messages
    .create({
      body: body,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: to,
    })
    .then(message => console.log(`Message sent: ${message.sid}`))
    .catch(error => console.error(`Error sending message: ${error.message}`));
};

// sendSMS('+917070128551', 'Hello from Twilio!');

//Sent from your Twilio trial account - Hello from Twilio!

