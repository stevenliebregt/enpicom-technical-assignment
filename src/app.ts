import express from 'express';
import Router from "./router";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/errorMiddleware";

const port = 5000;
const app = express();

const router = new Router();
app.use(bodyParser.json());

app.use('/', router.get());
app.use(errorMiddleware);

app.listen(port, () => console.log(`dna-api listening on port ${port}`));
