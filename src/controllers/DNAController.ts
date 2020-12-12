import express from 'express';
import HttpError from '../errors/HttpError';
import DNAService from "../services/DNAService";

export default class DNAController {

    dnaService: DNAService;

    constructor() {
        this.dnaService = new DNAService();
    };

    //TODO add body validation
    search = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const { id } = req.params;

        // TODO: MaxDistance = optional

        await this.dnaService.search(id, 3).then(result => {
            res.json(result);
        }).catch(error => {
            next(new HttpError(400, error.message));
        });
    };

    //TODO add body validation
    create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        await this.dnaService.create(req.body).then(result => {
            res.status(201).json(result);
        }).catch(error => {
            next(new HttpError(400, error.message));
        });
    };
}
