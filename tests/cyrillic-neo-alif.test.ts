"use strict";

import { translate } from "../src/ohm"

describe('cyrillic-neo-alif', () => {
    test('correctly parse к in front of back vowels', () => {
        expect(translate('ка')).toBe('qa') // russian a
        expect(translate('кa')).toBe('qa') // latin a
        expect(translate('ко')).toBe('qo')
        expect(translate('ку')).toBe('qu') // russian y
        expect(translate('кy')).toBe('qu') // latin y
        expect(translate('кы')).toBe('qı')
        expect(translate('кый')).toBe('qıy')
    }),
    test('correctly parse к in front of front vowels', () => {
        expect(translate('ке')).toBe('ke') // russian e
        expect(translate('кe')).toBe('ke') // latin e
        expect(translate('кә')).toBe('kə') 
        expect(translate('кө')).toBe('kö')
        expect(translate('кү')).toBe('kü')
        expect(translate('кэ')).toBe('ke')
    })
})