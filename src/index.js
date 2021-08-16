import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import router from './router';

const app = express();
var http = require('http').createServer(app);

mongoose.connect('mongodb://127.0.0.1:Covid_Data/Covid_Data');
mongoose.set('debug', true);

app.use(compression());
app.use(cors({ origin: '*' }))
app.use(morgan('combined'));
app.use(bodyParser.json({limit: "15360mb", type:'application/json'}));
app.use(bodyParser.urlencoded({extended: false, type:'application/json'})); 


app.use(bodyParser());

router(app);


const port = process.env.PORT || 3300;
// const port = process.env.PORT || 3300;

http.listen(port);
console.log('server listening on:', port);
