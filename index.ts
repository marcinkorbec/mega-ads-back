import express, {Router} from 'express';
import cors from 'cors';
import 'express-async-errors'
import {handleError} from "./utils/error";
import rateLimit from 'express-rate-limit'
import {adRouter} from "./routers/ad.router";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use(rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))


//Routes...

const router = Router()

router.use('/ad', adRouter);
app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Aplikacja nakurwia na porcie http://localhost:3001')
})