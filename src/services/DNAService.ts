export default class DNAService {

    dna: string[] = [];

    search = async (dna: string, levenshteinDistance: number): Promise<string> => {
        const items = "temp";
        if (!items) {
            throw new Error('Items could not be retrieved');
        }
        return items;
    }

    create = async (dna: string): Promise<string> => {
        if (this.dna.indexOf(dna) > -1) {
            throw new Error(`Could not insert duplicate entry: ${dna}`)
        }

        this.dna.push(dna);

        return dna;
    }
}
