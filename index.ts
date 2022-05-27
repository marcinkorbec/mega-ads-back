import express from 'express';
import cors from 'cors';
import 'express-async-errors'
import {handleError} from "./utils/error";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

//Routes...

app.get('/', async (req, res) => {
  throw new Error('Oj no!');
})

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Aplikacja nakurwia na porcie http://localhost:3001')
})