const express = require('express');
const helmet = require('helmet');
const router = require('./router');
const userRouter = require('./userRouter');

const app = express();

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);
app.use('/users', userRouter);

app.listen(5000, () => console.log('Listening on 5000...'));
