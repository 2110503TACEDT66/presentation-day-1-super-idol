const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const companies = require('./routes/companies');
const interviews = require('./routes/interviews');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/companies', companies);
app.use('/api/v1/interviews', interviews);
app.use('/api/v1/auth', auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log('Server running in',
    process.env.NODE_ENV,
    'on ' + process.env.HOST + ':' + PORT
    )
);
const swaggerOptions = {
    swaggerDefinition:{
        openai:'3.0.0',
        info:{
            title:'Library API',
            version: '1.0.0',
            description:'Online Job-Fair'
        },
        servers:[
            {
                url: process.env.HOST + ':' + PORT + '/api/v1'
            }
        ]
    }
}
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});