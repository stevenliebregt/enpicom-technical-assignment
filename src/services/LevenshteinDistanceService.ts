export default class LevenshteinDistanceService {
    _min = (d0: number, d1: number, d2: number, bx: number, ay: number) =>
    {
        return d0 < d1 || d2 < d1
            ? d0 > d2
                ? d2 + 1
                : d0 + 1
            : bx === ay
                ? d1
                : d1 + 1;
    }

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

        // TODO: Refactor and understand this code from: https://github.com/fonograph/js-levenshtein/blob/master/index.js
        while (sourceLength > 0 && (source.charCodeAt(sourceLength - 1) === target.charCodeAt(targetLength - 1))) {
            sourceLength--;
            targetLength--;
        }

        var offset = 0;

        while (offset < sourceLength && (source.charCodeAt(offset) === target.charCodeAt(offset))) {
            offset++;
        }

        sourceLength -= offset;
        targetLength -= offset;

        if (sourceLength === 0 || targetLength < 3) {
            return targetLength <= maxDistance;
        }

        var x = 0;
        var y;
        var d0;
        var d1;
        var d2;
        var d3;
        var dd;
        var dy;
        var ay;
        var bx0;
        var bx1;
        var bx2;
        var bx3;
        var min;

        var vector = [];

        for (y = 0; y < sourceLength; y++) {
            vector.push(y + 1);
            vector.push(source.charCodeAt(offset + y));
        }

        var len = vector.length - 1;

        for (; x < targetLength - 3;) {
            bx0 = target.charCodeAt(offset + (d0 = x));
            bx1 = target.charCodeAt(offset + (d1 = x + 1));
            bx2 = target.charCodeAt(offset + (d2 = x + 2));
            bx3 = target.charCodeAt(offset + (d3 = x + 3));
            dd = (x += 4);
            min = Infinity;
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                ay = vector[y + 1];
                d0 = this._min(dy, d0, d1, bx0, ay);
                d1 = this._min(d0, d1, d2, bx1, ay);
                d2 = this._min(d1, d2, d3, bx2, ay);
                dd = this._min(d2, d3, dd, bx3, ay);
                vector[y] = dd;
                d3 = d2;
                d2 = d1;
                d1 = d0;
                d0 = dy;
                if (maxDistance >= 0) {
                    min = Math.min(min, dd);
                }
            }
            if (maxDistance >= 0 && min > maxDistance) {
                return false;
            }
        }

        for (; x < targetLength;) {
            bx0 = target.charCodeAt(offset + (d0 = x));
            dd = ++x;
            min = Infinity;
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                vector[y] = dd = this._min(dy, d0, dd, bx0, vector[y + 1]);
                d0 = dy;
                if (maxDistance >= 0) {
                    min = Math.min(min, dd);
                }
            }
            if (maxDistance >= 0 && min > maxDistance) {
                return false;
            }
        }

        return true;
    }
}
