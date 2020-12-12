import { expect } from 'chai';
import LevenshteinDistanceService from '../src/services/LevenshteinDistanceService';

describe('LevenshteinDistanceService Tests', () => {
    it('should return true when the source and target are the same', () => {
        // 1. Arrange
        const source = 'kitten';
        const target = 'kitten';

        const levenshteinDistanceService = new LevenshteinDistanceService();

        // 2. Act
        const result = levenshteinDistanceService.canBeTransformedInMaxDistance(source, target, 1);

        // 3. Assert
        expect(result).to.be.true;
    });

    it('should return false if the source is an empty string and the target length is longer than the max distance', () => {
        // 1. Arrange
        const source = '';
        const target = 'sitting';

        const levenshteinDistanceService = new LevenshteinDistanceService();

        // 2. Act
        const result = levenshteinDistanceService.canBeTransformedInMaxDistance(source, target, 3); // 3 is definitely longer than 'sitting'.length

        // 3. Assert
        expect(result).to.be.false;
    });

    it('should return true if the source is an empty string and the target length is the same as the max distance', () => {
        // 1. Arrange
        const source = 'kitten';
        const target = '';

        const levenshteinDistanceService = new LevenshteinDistanceService();

        // 2. Act
        const result = levenshteinDistanceService.canBeTransformedInMaxDistance(source, target, 6); // 6 is the same as 'kitten'.length

        // 3. Assert
        expect(result).to.be.true;
    });

    it('should return true for a transformation from kitten to sitting with a distance of 3', () => {
        // 1. Arrange
        const source = 'kitten';
        const target = 'sitting';

        const levenshteinDistanceService = new LevenshteinDistanceService();

        // 2. Act
        const result = levenshteinDistanceService.canBeTransformedInMaxDistance(source, target, 3);

        // 3. Assert
        expect(result).to.be.true;
    });

    it('should return false for a transformation from kitten to sitting with a distance of 2', () => {
        // 1. Arrange
        const source = 'kitten';
        const target = 'sitting';

        const levenshteinDistanceService = new LevenshteinDistanceService();

        // 2. Act
        const result = levenshteinDistanceService.canBeTransformedInMaxDistance(source, target, 2);

        // 3. Assert
        expect(result).to.be.false;
    });

    it('should return true for a transformation from shilling to shipping with a distance of 2', () => {
        // 1. Arrange
        const source = 'shilling';
        const target = 'shipping';

        const levenshteinDistanceService = new LevenshteinDistanceService();

        // 2. Act
        const result = levenshteinDistanceService.canBeTransformedInMaxDistance(source, target, 2);

        // 3. Assert
        expect(result).to.be.true;
    });

    it('should test these samples', () => {
        const levenshteinDistanceService = new LevenshteinDistanceService();

        expect(levenshteinDistanceService.canBeTransformedInMaxDistance('ship', 'shin', 0)).to.be.false;
        expect(levenshteinDistanceService.canBeTransformedInMaxDistance('ship', 'shin', 1)).to.be.true;
        expect(levenshteinDistanceService.canBeTransformedInMaxDistance('ship', 'shin', 2)).to.be.true;

        expect(levenshteinDistanceService.canBeTransformedInMaxDistance('iron man', 'woman', 1)).to.be.false;
        expect(levenshteinDistanceService.canBeTransformedInMaxDistance('iron man', 'woman', 3)).to.be.false;
        expect(levenshteinDistanceService.canBeTransformedInMaxDistance('iron man', 'woman', 4)).to.be.true;
        expect(levenshteinDistanceService.canBeTransformedInMaxDistance('iron man', 'woman', 5)).to.be.true;
    });

    // https://www.youtube.com/watch?v=We3YDTzNXEk
    it('should help me understand it with the same words from the example video', () => {
        // 1. Arrange
        const source = 'abcdef';
        const target = 'azced';

        const levenshteinDistanceService = new LevenshteinDistanceService();

        // 2. Act
        const result = levenshteinDistanceService.canBeTransformedInMaxDistance(source, target, 3);

        // 3. Assert
        expect(result).to.be.true;
    });
});
