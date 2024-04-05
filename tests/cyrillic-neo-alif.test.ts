"use strict";

import { translate } from "../src/ohm"

describe('cyrillic-neo-alif', () => {
    test('correctly parse к in front of back vowels', () => {
        expect(translate('ка')).toBe('qa')
        expect(translate('кa')).toBe('qa')
        expect(translate('ко')).toBe('qo')
        expect(translate('ку')).toBe('qu')
        expect(translate('кy')).toBe('qu')
        expect(translate('кы')).toBe('qı')
        expect(translate('кый')).toBe('qıy')
    })
})