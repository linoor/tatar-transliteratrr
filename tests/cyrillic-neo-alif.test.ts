"use strict";

import { translate } from "../src/ohm"

describe('cyrillic-neo-alif', () => {
    test('correctly parse к in back vowels', () => {
        expect(translate('ка')).toBe('qa') // russian a
        expect(translate('кa')).toBe('qa') // latin a
        expect(translate('ко')).toBe('qo')
        expect(translate('ку')).toBe('qu') // russian y
        expect(translate('кy')).toBe('qu') // latin y
        expect(translate('кы')).toBe('qı')
        expect(translate('ки')).toBe('qi')
        expect(translate('кый')).toBe('qıy')
    }),
    test('correctly parse к in front vowels', () => {
        expect(translate('ке')).toBe('ke') // russian e
        expect(translate('кe')).toBe('ke') // latin e
        expect(translate('кә')).toBe('kə') 
        expect(translate('кө')).toBe('kö')
        expect(translate('кү')).toBe('kü')
        expect(translate('кэ')).toBe('ke')
    })
    test('correctly parse г in back vowels', () => {
        expect(translate('га')).toBe('ğa') // russian a
        expect(translate('гa')).toBe('ğa') // latin a
        expect(translate('го')).toBe('ğo')
        expect(translate('гу')).toBe('ğu') // russian y
        expect(translate('гy')).toBe('ğu') // latin y
        expect(translate('ги')).toBe('ği')
        expect(translate('гы')).toBe('ğı')
        expect(translate('гый')).toBe('ğıy')
    }),
    test('correctly parse г in front vowels', () => {
        expect(translate('ге')).toBe('ge') // russian e
        expect(translate('гe')).toBe('ge') // latin e
        expect(translate('гә')).toBe('gə') 
        expect(translate('гө')).toBe('gö')
        expect(translate('гү')).toBe('gü')
        expect(translate('гэ')).toBe('ge')
    })
})