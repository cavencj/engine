import { extend } from '../../src/core/core.js';

import { expect } from 'chai';

describe('core', () => {

    describe('#extend', () => {

        it('combines two objects', () => {
            const o1 = {
                a: 'a',
                b: 'b'
            };

            const o2 = {
                c: 'c',
                d: 'd'
            };

            const o3 = extend(o1, o2);
            expect(o3.a).to.equal('a');
            expect(o3.b).to.equal('b');
            expect(o3.c).to.equal('c');
            expect(o3.d).to.equal('d');
        });

        it('combines two arrays', () => {
            const a1 = [1, 2, 3];
            const a2 = [4, 5, 6];

            const a3 = extend(a1, a2);
            expect(a3.length).to.equal(a2.length);
            expect(a3[0]).to.equal(a2[0]);
            expect(a3[1]).to.equal(a2[1]);
            expect(a3[2]).to.equal(a2[2]);
        });

        it('combines and object and an array', () => {
            const o1 = { a: 'a' };
            const a1 = [1, 2];

            const o2 = extend(o1, a1);
            expect(o2.a).to.equal('a');
            expect(o2[0]).to.equal(1);
            expect(o2[1]).to.equal(2);
        });

        it('deep combines two objects', () => {
            const o1 = {
                A: 'A'
            };

            const o2 = {
                a: { b: 'b' },
                c: [1, 2]
            };

            const o3 = extend(o1, o2);
            expect(o3.a.b).to.equal('b');
            expect(o3.c[0]).to.equal(1);
            expect(o3.c[1]).to.equal(2);
            expect(o3.A).to.equal('A');
        });

        it('deep combines two objects and does not copy references', () => {
            const o1 = {
                A: 'A'
            };

            const o2 = {
                a: { b: 'b' },
                c: [1, 2]
            };

            const o3 = extend(o1, o2);

            // Change original so if o1 contains a reference test will fail
            o2.a.b = 'z';

            expect(o3.a.b).to.equal('b');
            expect(o3.c[0]).to.equal(1);
            expect(o3.c[1]).to.equal(2);
            expect(o3.A).to.equal('A');
        });

    });

});
