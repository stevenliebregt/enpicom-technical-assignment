import { expect } from 'chai';
import DNAService from '../src/services/DNAService';

describe('DNA Service Tests', () => {
    it('should return the correct elements', async () => {
        // 1. Arrange
        const dnaService = new DNAService();

        const query = 'nap';
        const maxDistance = 4;

        await dnaService.create('map') // distance = 1
        await dnaService.create('pan') // distance = 2
        await dnaService.create('trap') // distance = 2
        await dnaService.create('pancake') // distance = 5 (not reachable)

        // 2. Act
        const result = await dnaService.search(query, maxDistance);

        // 3. Assert
        expect(result).to.include.members(['map', 'pan', 'trap']);
    });

    it('should not take really long', async () => {
        // 1. Arrange
        const dnaService = new DNAService();

        const query = 'something';
        const maxDistance = Infinity;

        dnaService.store = [ // 150 random words
            'order','random','grass','chase','publisher','profound','name','hostile','bottle','triangle','translate','eyebrow','sock','climb','epicalyx','version','collection','neighbour','copyright','minute','deserve','teacher','belong','enhance','is','offensive','accurate','face','marriage','collar','quote','helpless','drum','opposite','outline','hero','competence','quality','swear','decline','house','tent','execute','dozen','turkey','smoke','progressive','pastel','permission','compound','easy','stride','able','he','strikebreaker','unlawful','safety','suit','head','claim','retiree','conviction','camp','ecstasy','start','brag','breast','stress','sculpture','danger','swell','cereal','van','insight','squash','hut','dismissal','bathroom','disclose','evolution','subway','quota','bond','threshold','wonder','basis','ballet','bread','obscure','ward','overlook','arrow','patrol','script','negligence','defendant','temperature','behave','steak','aisle','charter','pedestrian','ex','umbrella','morsel','chew','pleasant','rotten','feed','abolish','carve','honor','texture','minimize','amuse','club','suitcase','clash','performance','spread','coach','speaker','sun','discreet','monk','beat','cinema','know','copper','complication','outlet','aluminium','twitch','twin','consumption','glacier','route','critical','rotate','glow','balance','berry','blackmail','calf','lunch','scatter','invite','machinery','revolution','turkey',
        ];

        // 2. Act
        const result = await dnaService.search(query, maxDistance);

        // 3. Assert
        expect(result).to.include.members(dnaService.store);
    });
});
