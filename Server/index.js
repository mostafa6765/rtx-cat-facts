import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import cors from 'cors'
import { authorization } from './middleware/authorization.js'

// routes 
import routes from './routes/index.js';

dotenv.config()
const port = process.env.PORT || 3000;

// Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable cors 
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

// basic authorization middleware
app.use(authorization)

// Require our routes into the application.

// Initializing routes.
app.use('/api/v1/facts',routes)


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// Server listen to port
app.listen(port, () => {
  console.log(`RTX server app listening at - http://127.0.0.1:${port}`)
})


export default app;