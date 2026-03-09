"use strict";

import { translate } from "../src/ohm"

describe('cyrillic-janalif', () => {
    const cyrillic = 'Cyrillic'
    const janalif = 'Janalif'

    test('uses Jaꞑalif-specific letters', () => {
        expect(translate(cyrillic, janalif, 'сәлам')).toBe('səlam')
        expect(translate(cyrillic, janalif, 'җиңү')).toBe('çiꞑy')
        expect(translate(cyrillic, janalif, 'жәй')).toBe('ƶəj')
        expect(translate(cyrillic, janalif, 'га')).toBe('ƣa')
    })

    test('converts Janalif back to Cyrillic', () => {
        expect(translate(janalif, cyrillic, 'səlam')).toBe('сәлам')
        expect(translate(janalif, cyrillic, 'çiꞑy')).toBe('җиңү')
        expect(translate(janalif, cyrillic, 'ƶəj')).toBe('жәй')
    })

    test('preserves uppercase in Janalif conversion', () => {
        expect(translate(cyrillic, janalif, 'Җ')).toBe('Ç')
        expect(translate(cyrillic, janalif, 'Ң')).toBe('Ꞑ')
        expect(translate(cyrillic, janalif, 'Ү')).toBe('Y')
    })
})
