"use strict";

import { translate } from "../src/ohm"

describe('cyrillic-neo-alif', () => {
    const from = 'Cyrillic'
    const to = 'NeoAlif'

    test('correctly parse к in back vowels', () => {
        expect(translate(from, to, 'ка')).toBe('qa') // russian a
        expect(translate(from, to, 'кa')).toBe('qa') // latin a
        expect(translate(from, to, 'ко')).toBe('qo')
        expect(translate(from, to, 'ку')).toBe('qu') // russian y
        expect(translate(from, to, 'кy')).toBe('qu') // latin y
        expect(translate(from, to, 'кы')).toBe('qı')
    }),
    test('correctly parse к in front vowels', () => {
        expect(translate(from, to, 'ке')).toBe('ke') // russian e
        expect(translate(from, to, 'кe')).toBe('ke') // latin e
        expect(translate(from, to, 'кә')).toBe('kə') 
        expect(translate(from, to, 'кө')).toBe('kö')
        expect(translate(from, to, 'кү')).toBe('kü')
        expect(translate(from, to, 'кэ')).toBe('ke')
        expect(translate(from, to, 'ки')).toBe('ki')
    })
    test('correctly parse г in back vowels', () => {
        expect(translate(from, to, 'га')).toBe('ğa') // russian a
        expect(translate(from, to, 'гa')).toBe('ğa') // latin a
        expect(translate(from, to, 'го')).toBe('ğo')
        expect(translate(from, to, 'гу')).toBe('ğu') // russian y
        expect(translate(from, to, 'гy')).toBe('ğu') // latin y
        expect(translate(from, to, 'гы')).toBe('ğı')
    }),
    test('correctly parse г in front vowels', () => {
        expect(translate(from, to, 'ге')).toBe('ge') // russian e
        expect(translate(from, to, 'гe')).toBe('ge') // latin e
        expect(translate(from, to, 'гә')).toBe('gə') 
        expect(translate(from, to, 'гө')).toBe('gö')
        expect(translate(from, to, 'гү')).toBe('gü')
        expect(translate(from, to, 'гэ')).toBe('ge')
        expect(translate(from, to, 'ги')).toBe('gi')
    }),
    test('correctly parse "e" after consonants', () => {
        expect(translate(from, to, 'ке')).toBe('ke')
        expect(translate(from, to, 'ге')).toBe('ge')
        expect(translate(from, to, 'де')).toBe('de')
        expect(translate(from, to, 'же')).toBe('je')
        expect(translate(from, to, 'зе')).toBe('ze')
        expect(translate(from, to, 'йе')).toBe('ye')
        expect(translate(from, to, 'ле')).toBe('le')
        expect(translate(from, to, 'ме')).toBe('me')
        expect(translate(from, to, 'не')).toBe('ne')
        expect(translate(from, to, 'ңе')).toBe('ñe')
        expect(translate(from, to, 'пе')).toBe('pe')
        expect(translate(from, to, 'ре')).toBe('re')
        expect(translate(from, to, 'се')).toBe('se')
        expect(translate(from, to, 'те')).toBe('te')
        expect(translate(from, to, 'фе')).toBe('fe')
        expect(translate(from, to, 'хе')).toBe('xe')
        expect(translate(from, to, 'һе')).toBe('he')
        expect(translate(from, to, 'че')).toBe('çe')
        expect(translate(from, to, 'ше')).toBe('şe')
        expect(translate(from, to, 'җе')).toBe('ce')
        expect(translate(from, to, 'це')).toBe('tse')
        expect(translate(from, to, 'ще')).toBe('şçe')
    })
    test('correctly parse "ё" in russian loanwords', () => {
        expect(translate(from, to, 'гё')).toBe('ğyo') // russian г
        expect(translate(from, to, 'гё')).toBe('ğyo') // latin г
    })

    test('correctly parse "в"', () => {
        expect(translate(from, to, 'вакытында')).toBe('waqıtında')
        // expect(translate('видео')).toBe('video')
    })

    test('correctly parse "sigezayaq"', () => {
        expect(translate(from, to, 'сигезаяк')).toBe('sigezayaq')
    })
})