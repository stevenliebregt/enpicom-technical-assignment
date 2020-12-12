export default class LevenshteinDistanceService {
    canBeTransformedInMaxDistance = (source: string, target: string, maxDistance: number): boolean => {
        if (source === target) return true;
        if (source.length === 0) return target.length <= maxDistance;
        if (target.length === 0) return source.length <= maxDistance;

        // Swap to save some memory O(min(source,target)) instead of O(source).
        if (source.length > target.length) {
            [source, target] = [target, source];
        }

        let sourceLength = source.length;
        let targetLength = target.length;

        if (targetLength - sourceLength > maxDistance) return false;

        // Ignore the characters that are the same.
        // For example, shipping and shilling only differ on the 3rd and 4th index, so our length can be reduced to 2.
        while (sourceLength > 0 && (source.charCodeAt(sourceLength - 1) === target.charCodeAt(targetLength - 1))) {
            sourceLength--;
            targetLength--;
        }

        // Create an offset so we can skip to the first chars that are different.
        let offset = 0;

        while (offset < sourceLength && (source.charCodeAt(offset) === target.charCodeAt(offset))) {
            offset++;
        }

        sourceLength -= offset;
        targetLength -= offset;

        // Build the comparison matrix.
        let matrix: number[][] = [];

        // Initialize first row.
        for (let i = 0; i <= targetLength; i++) {
            matrix[i] = [i];
        }

        // Initialize first column.
        for (let j = 0; j <= sourceLength; j++) {
            matrix[0][j] = j;
        }

        // Fill the matrix.
        for (let i = 1; i <= targetLength; i++) {
            for (let j = 1; j <= sourceLength; j++) {
                if (target.charAt(offset + i - 1) == source.charAt(offset + j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // Substitution
                        Math.min(
                            matrix[i][j - 1] + 1, // Insertion
                            matrix[i - 1][j] + 1)); // Deletion
                }
            }

            // If the entire row has a cost higher than the maximum cost, we can return.
            if (Math.min(...matrix[i]) > maxDistance) return false;
        }

        return matrix[targetLength][sourceLength] <= maxDistance;
    }
}
