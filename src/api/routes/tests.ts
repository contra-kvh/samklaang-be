import {Router} from 'express';
import { encryptHandler, decryptHandler } from './handlers/tests';

const testsRouter: Router = Router();
testsRouter.post("/encrypt", encryptHandler);
testsRouter.post("/tests/decrypt", decryptHandler);

export default testsRouter;
