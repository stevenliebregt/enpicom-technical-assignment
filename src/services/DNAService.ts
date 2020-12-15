import LevenshteinDistanceService from './LevenshteinDistanceService';

export default class DNAService {
    private levenshteinDistanceService: LevenshteinDistanceService = new LevenshteinDistanceService();

    // TODO: Inject so we can mock the store without having it public
    store: string[] = [];

    search = async (query: string, maxDistance: number = Infinity): Promise<string[]> => {

        if (!this.validate(query)) {
            throw new Error("DNA does not match format.")
        }

        let results: string[] = [];

        // TODO: This is incredibly slow
        this.store.forEach((entry) => {
            if (this.levenshteinDistanceService.canBeTransformedInMaxDistance(entry, query, maxDistance)) {
                results.push(entry);
            }
        });

        return results;
    };

    create = async (dna: string): Promise<string> => {

        if (!this.validate(dna)) {
            throw new Error("DNA does not match format.")
        }

        if (this.store.indexOf(dna) > -1) {
            throw new Error(`Could not insert duplicate entry: ${dna}`)
        }

        this.store.push(dna);

        return dna;
    };

    validate = (dna: string): boolean => {
        return dna.match(/^[ACTG]+$/i) != null;
    }
}
