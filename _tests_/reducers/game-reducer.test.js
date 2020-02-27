import gameReducer from './../../src/reducers/game-reducer';
describe('gameReducer', () => {
    test('Should return default state if no type is recognized', () => {
        expect(gameReducer({}, { type: null })).toEqual({});
    });
});