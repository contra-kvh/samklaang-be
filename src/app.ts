import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { testRouter } from './api';

const app: Express = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// healthcheck
app.get("/", (_req: Request, resp: Response) => {
  resp.status(200).send({status: "ok"});
});

app.get("/echo", (req: Request, res: Response) => {
  res.status(200).send(req.body);
})

app.use("/tests", testRouter);

export default app;
