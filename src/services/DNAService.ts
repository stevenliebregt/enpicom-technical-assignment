export default class DNAService {

    dna: string[];

    search = async (dna: string, levenshteinDistance: number): Promise<string> => {
        const items = "temp";
        if (!items) {
            throw new Error('Items could not be retrieved');
        }
        return items;
    }

    create = async (dna: string): Promise<string> => {
        try {
            this.dna.push("temp");
            return "temp";
        } catch {
            throw new Error('The item(s) could not be created');
        }
    }
}