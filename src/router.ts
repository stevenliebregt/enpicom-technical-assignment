import express from 'express';
import DNAController from './controllers/DNAController';

export default class Router {

    router: express.Router = express.Router();

    constructor() {
        const dnaController = new DNAController();

        this.router.post('/dna', dnaController.create);
        this.router.get('/dna', dnaController.search);
    }

    get = (): express.Router => {
        return this.router;
    }
}

