import express, {Express, Request, Response} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { testsRouter, authRouter, meetRouter, usersRouter } from './api';
import { ensureJsonResponse } from './middleware/json-resp';

const app: Express = express()

app.use(ensureJsonResponse)
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

app.use("/tests", testsRouter);
app.use("/auth", authRouter);
app.use("/meet", meetRouter);
app.use("/users", usersRouter);

export default app;
