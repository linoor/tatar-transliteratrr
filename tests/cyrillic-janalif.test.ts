"use strict";

import { translate } from "../src/ohm"

describe('cyrillic-janalif', () => {
    const cyrillic = 'Cyrillic'
    const janalif = 'Janalif'

    test('converts schwa to ä and в to v', () => {
        expect(translate(cyrillic, janalif, 'сәлам')).toBe('sälam')
        expect(translate(cyrillic, janalif, 'вакыт')).toBe('vaqıt')
    })

    test('converts Janalif back to Cyrillic', () => {
        expect(translate(janalif, cyrillic, 'sälam')).toBe('сәлам')
        expect(translate(janalif, cyrillic, 'vaqıt')).toBe('вакыт')
    })

    test('preserves uppercase in Janalif conversion', () => {
        expect(translate(cyrillic, janalif, 'Ә')).toBe('Ä')
        expect(translate(cyrillic, janalif, 'В')).toBe('V')
    })
})
