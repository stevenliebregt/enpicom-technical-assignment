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







        // TODO: Not yet sure what this is used for
        while (sourceLength > 0 && (source.charCodeAt(sourceLength - 1) === target.charCodeAt(targetLength - 1))) {
            sourceLength--;
            targetLength--;
        }

        // Ignore all the starting characters that are the same in both the source and the target.
        let offset = 0;

        while (offset < sourceLength && (source.charCodeAt(offset) === target.charCodeAt(offset))) {
            offset++;
        }

        sourceLength -= offset;
        targetLength -= offset;

        if (sourceLength === 0 || targetLength < 3) return targetLength <= maxDistance; // TODO: <=  or <


        // TODO: Figure this out nicely

        let matrix: number[][] = [[]];
        let i;
        let j;

        for (j = 0; j <= targetLength; j++) {
            matrix[0][j] = j;
        }

        for (i = 1; i <= sourceLength; i++) {
            let c1: string;
            let minJ: number;
            let maxJ: number;
            let colMin: number;
            let next: number;
            let prev: number;

            c1 = source[i - 1];

            minJ = 1;
            if (i > maxDistance) {
                minJ = i - maxDistance;
            }
            maxJ = targetLength;
            if (targetLength > maxDistance + i) {
                maxJ = maxDistance + i;
            }
            colMin = Number.MAX_VALUE;
            next = i % 2;
            if (next == 1) {
                prev = 0;
            }
            else {
                prev = 1;
            }

            if (matrix[next] === undefined) {
                matrix[next] = [];
            }

            matrix[next][0] = i;
            /* Loop over rows. */
            for (j = 1; j <= targetLength; j++) {
                if (j < minJ || j > maxJ) {
                    /* Put a large value in there. */
                    matrix[next][j] = maxDistance + 1;
                }
                else {
                    let c2: string;

                    c2 = target[j-1];
                    if (c1 == c2) {
                        /* The character at position i in word1 is the same as
                           the character at position j in word2. */
                        matrix[next][j] = matrix[prev][j-1];
                    }
                    else {
                        /* The character at position i in word1 is not the
                           same as the character at position j in word2, so
                           work out what the minimum cost for getting to cell
                           i, j is. */
                        let del: number;
                        let insert: number;
                        let substitute: number;
                        let minimum: number;

                        del = matrix[prev][j] + 1;
                        insert = matrix[next][j-1] + 1;
                        substitute = matrix[prev][j-1] + 1;
                        minimum = del;
                        if (insert < minimum) {
                            minimum = insert;
                        }
                        if (substitute < minimum) {
                            minimum = substitute;
                        }
                        matrix[next][j] = minimum;
                    }
                }
                /* Find the minimum value in the ith column. */
                if (matrix[next][j] < colMin) {
                    colMin = matrix[next][j];
                }
            }
            if (colMin > maxDistance) {
                // TODO: Not working correctly
                /* All the elements of the ith column are greater than the
                   maximum, so no match less than or equal to max can be
                   found by looking at succeeding columns. */
                return false;
            }
        }

        return true;
    }
}
