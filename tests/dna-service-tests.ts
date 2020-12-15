import { expect } from 'chai';
import DNAService from '../src/services/DNAService';

describe('DNA Service Tests', () => {
    it('should return the correct elements', async () => {
        // 1. Arrange
        const dnaService = new DNAService();

        const query = 'ACT';
        const maxDistance = 4;

        await dnaService.create('ACG') // distance = 1
        await dnaService.create('ATG') // distance = 2
        await dnaService.create('ACGG') // distance = 2
        await dnaService.create('GTGGC') // distance = 5 (not reachable)

        // 2. Act
        const result = await dnaService.search(query, maxDistance);

        // 3. Assert
        expect(result).to.include.members(['ACG', 'ATG', 'ACGG']);
    });

    it('should also work without the maxDistance parameter', async () => {
        // 1. Arrange
        const dnaService = new DNAService();

        const query = 'ACT';

        dnaService.store = [
            'ACG', // distance = 1
            'ATG', // distance = 2
            'ACGG', // distance = 2
            'GTGGC' // distance = 5
        ];

        // 2. Act
        const result = await dnaService.search(query);

        // 3. Assert
        expect(result).to.include.members(dnaService.store);
    });

    it('should not take really long', async () => {
        // 1. Arrange
        const dnaService = new DNAService();

        const query = 'gcctagtacactgcaacattatagccgtgtggattgaatccgccggttgtgtatcagaacgattccgtcgtctataaatcggtatctggcacttgcccacaaacgtacaccattaaaagttacgtcctagagcccaggtgcgcgaaatgggaaccccgcgtccgctgagtatttggtgaccgtgaaaacaagaacttatgtggtacgtcttgccaagtactctccgttacttgggccaggttggatgtact';

        dnaService.store = [
            'gcctagtacactgcaacattatagccgtgtggattgaatccgccggttgtgtatcagaacgattccgtcgtctataaatcggtatctggcacttgcccacaaacgtacaccattaaaagttacgtcctagagcccaggtgcgcgaaatgggaaccccgcgtccgctgagtatttggtgaccgtgaaaacaagaacttatgtggtacgtcttgccaagtactctccgttacttgggccaggttggatgtact',
            'ttgcggtgcttagtctcgtccagggagcctggttgtcttgtaaaaagtttatacgatctgacggcctggaggactaaggagcgctttccctccattacaaaagggcacagtttatcatagttgtgcgttgagtgccaacctcaccggataactcaggcctatcatacattatgcgagcctagtgactgaacacaatcccagaggcagccacttg',
            'atgtacatgtacattgggtcatgtacgcacttagaaaaccccttataccagggtcggtggcctaggacgacctcggagcgccacgctcaaacgttgcggaggtgccaatttggactttcttcgtggtttgcatacccgtgaacggacctacgaagtaggctggatcaccgaataagctaaagcattcctacctttgtgtcgttgataaaatttctcgtcttagcacagagacgtaccg',
            'gcacgctcagaagatcttcgtcgactagcacaatagaatttttcactcaacagtggtaatattatatataaccccctacttgaggaatccgtaaagtacccatgactgttattgcgcctatcgcgacttggctgcacccccgaagaattgaagcgggtccggcggtgtcgtgtgccattccagagtcatatgggttctgcaccactggagtagtggctattcgatatcagactcggatttccagacaacgggtcttgcagatgtagagcgcagtcgagcactggtcgaacgatgctc',
            'gaccaaccttggttacctgcgacgtactgccaagttaccataataatagccgtagggtgagattgatgagatcataagtaaaggtcgggattcttctctcccccttgagctcttgattgtatctagcaggccacaatgactaatagccaatggctggccggtgagagctcctggaactgtagccctaaaaacacggtccagaccgtttcggcagaatcaccggtatcatgccggcgtacgatggttgttcctctgtat',
            'gcacggaaaaatgcgagaaaatgaatctatttgagacaaggtgggtcggattaaatacgaatcggagcacagcaaggcatcccgacggctctatcttcgctgatttatggggttgttgtttgttgcatgatgcagctcccagtccgactcacattcgtttcccgacctggtcgctcattctctaagcggccctacatgacaagtgcacc',
            'gtgatagatcacgccggtcaaccacacgcgacagtggacaggaaaaatgaaaggtagcctacgtaggctattaggctgggttccgttgcagaatgaatttaaaaacgatgctgcacgtcccctgcgtttctgaagatgtcacgctcaagtatttcatgttatcgtcaagtatgtttgggtcacactcaggcgtgttcctgtccacctggcatatgcagataagtggctccccgtttgatcggaccagtcgcttcctctctaaagaccgca',
            'cacgtattaaaatgatccgactccatccccgtattatctcctgaagagaggtgatgcaccaggccgaaaagttcctcctcgtcggtcttataacctatatatgcggtattggtctgctgaagttggccgtggcagaatattgcgcgacatacaagatgaccctgcagagatgctcgtggtcgatctcagcgtacggattccatgtga',
            'actatcaaaacgcggaacctcaacatggcgctttgtccaggaaatagtctaggagacttactcatgttcgtactacgactagatctgtcctcaatacgagtcatgtttccgcgtcagcccgtcaacttgtccttgggaagaccgacagcggccggggatcgggtaattaaatatcgccctactatctaccacttgaatggtcctcaattcttgcggtccaacaattggagaagctccttgaatgcaggcttagtaggaggcgtagggtcatgcagtcggtg',
            'tctctcacttacgcattgagtactttgcacaaagtgagggtttcacttgcgagccgctacctattcgccatcacagcaccatgttacaatagggggtgaggacgttaaaccctgacttcattacaagagtcggtggtctatgttcaagtacccgaacatcgttggacgcaggaggcgccccagataattggtgtaccccgtaggatcggcatggataattc',
        ];

        // 2. Act
        const result = await dnaService.search(query);

        // 3. Assert
        expect(result).to.include.members(dnaService.store);
    });
});
