import express from 'express';
import DNAService from "../services/DNAService";
import createHttpError from "http-errors";

export default class DNAController {

    dnaService: DNAService;

    constructor() {
        this.dnaService = new DNAService();
    }

    //TODO add body validation
    search = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        try {
            res.json(await this.dnaService.search(id, 3));
        } catch (err) {
            next(createHttpError(404, err.message));
        }
    }

    //TODO add body validation
    create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.status(201).json((await this.dnaService.create(req.body)));
        } catch (err) {
            next(createHttpError(404, err.message));
        }
    }
}