import { Keyboard } from '../../../src/platform/input/keyboard.js';
import { EVENT_KEYDOWN, EVENT_KEYUP, KEY_UP } from '../../../src/platform/input/constants.js';

import { expect } from 'chai';

describe('Keyboard', () => {

    /** @type { Keyboard } */
    let keyboard;

    beforeEach(() => {
        keyboard = new Keyboard();
        keyboard.attach(window);
    });

    afterEach(() => {
        keyboard.detach();
    });

    describe('#constructor', () => {

        it('should create a new instance', () => {
            expect(keyboard).to.be.an.instanceOf(Keyboard);
        });

    });

    describe('#isPressed', () => {

        it('should return false for a key that is not pressed', () => {
            expect(keyboard.isPressed(KEY_UP)).to.be.false;
        });

        it('should return true for a key that is pressed', () => {
            const keyDownEvent = new KeyboardEvent('keydown', {
                keyCode: 38 // Up arrow
            });
            window.dispatchEvent(keyDownEvent);

            expect(keyboard.isPressed(KEY_UP)).to.be.true;

            keyboard.update();

            expect(keyboard.isPressed(KEY_UP)).to.be.true;

            const keyUpEvent = new KeyboardEvent('keyup', {
                keyCode: 38 // Up arrow
            });
            window.dispatchEvent(keyUpEvent);

            expect(keyboard.isPressed(KEY_UP)).to.be.false;
        });

    });

    describe('#on', () => {

        it('should handle keydown events', (done) => {
            keyboard.on(EVENT_KEYDOWN, (event) => {
                expect(event.key).to.equal(KEY_UP);
                expect(event.element).to.equal(window);
                expect(event.event).to.be.an.instanceOf(KeyboardEvent);

                done();
            });

            const keyDownEvent = new KeyboardEvent('keydown', {
                keyCode: 38 // Up arrow
            });
            window.dispatchEvent(keyDownEvent);
        });

        it('should handle keyup events', (done) => {
            keyboard.on(EVENT_KEYUP, (event) => {
                expect(event.key).to.equal(KEY_UP);
                expect(event.element).to.equal(window);
                expect(event.event).to.be.an.instanceOf(KeyboardEvent);

                done();
            });

            const keyUpEvent = new KeyboardEvent('keyup', {
                keyCode: 38 // Up arrow
            });
            window.dispatchEvent(keyUpEvent);
        });

    });

    describe('#wasPressed', () => {

        it('should return false for a key that was not pressed', () => {
            expect(keyboard.wasPressed(KEY_UP)).to.be.false;
        });

        it('should return true for a key that was pressed since the last update', () => {
            const keyDownEvent = new KeyboardEvent('keydown', {
                keyCode: 38 // Up arrow
            });
            window.dispatchEvent(keyDownEvent);

            expect(keyboard.wasPressed(KEY_UP)).to.be.true;

            keyboard.update();

            expect(keyboard.wasPressed(KEY_UP)).to.be.false;
        });

    });

    describe('#wasReleased', () => {

        it('should return false for a key that was not released', () => {
            expect(keyboard.wasReleased(KEY_UP)).to.be.false;
        });

        it('should return true for a key that was released since the last update', () => {
            const keyDownEvent = new KeyboardEvent('keydown', {
                keyCode: 38 // Up arrow
            });
            window.dispatchEvent(keyDownEvent);

            keyboard.update();

            const keyUpEvent = new KeyboardEvent('keyup', {
                keyCode: 38 // Up arrow
            });
            window.dispatchEvent(keyUpEvent);

            expect(keyboard.wasReleased(KEY_UP)).to.be.true;

            keyboard.update();

            expect(keyboard.wasReleased(KEY_UP)).to.be.false;
        });

    });

});
