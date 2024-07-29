import {Router} from 'express';
import { encryptHandler, decryptHandler } from './handlers/tests';

const testRouter: Router = Router();
testRouter.post("/encrypt", encryptHandler);
testRouter.post("/decrypt", decryptHandler);

export default testRouter;
