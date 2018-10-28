import getImg from './list-img';
describe('Test getImg', () => {
    test('get 10 pic getImg(10)', () => {
        expect(getImg(10).length).toBe(10);
    })
    test('no so many pictures getImg(36)', () => {
        expect(getImg(36)).toEqual(['no so many pictures']);
    })
    test('count only integer getImg(\'text\')', () => {
        expect(getImg('text')).toEqual(['count only integer']);
    })
})