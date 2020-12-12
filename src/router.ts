import express from 'express';
import DNAController from './controllers/DNAController';

export default class Router {

    router: express.Router = express.Router();

    constructor() {
        const dnaController = new DNAController();

        this.router.post('/dna', dnaController.create);
        this.router.post('/dna/searches', dnaController.search);
    }

    get = (): express.Router => {
        return this.router;
    }
}

