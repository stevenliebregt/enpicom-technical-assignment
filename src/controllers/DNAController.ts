import express from 'express';
import HttpError from '../errors/HttpError';
import DNAService from "../services/DNAService";

export default class DNAController {

    dnaService: DNAService;

    constructor() {
        this.dnaService = new DNAService();
    };

    search = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const maxDistance: number = +req.body.maxDistance;
        const dna: string = req.body.dna;

        await this.dnaService.search(dna, maxDistance).then(results => {
            res.json({results});
        }).catch(error => {
            next(new HttpError(400, error.message));
        });
    };

    create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const newDna = req.body.dna;
        await this.dnaService.create(newDna).then(dna => {
            res.status(201).json({dna});
        }).catch(error => {
            next(new HttpError(400, error.message));
        });
    };
}
