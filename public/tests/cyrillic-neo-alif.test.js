"use strict";
import { translate } from "../src/ohm";
describe('cyrillic-neo-alif', () => {
    test('correctly parse к in back vowels', () => {
        expect(translate('ка')).toBe('qa'); // russian a
        expect(translate('кa')).toBe('qa'); // latin a
        expect(translate('ко')).toBe('qo');
        expect(translate('ку')).toBe('qu'); // russian y
        expect(translate('кy')).toBe('qu'); // latin y
        expect(translate('кы')).toBe('qı');
        expect(translate('ки')).toBe('qi');
        expect(translate('кый')).toBe('qıy');
    }),
        test('correctly parse к in front vowels', () => {
            expect(translate('ке')).toBe('ke'); // russian e
            expect(translate('кe')).toBe('ke'); // latin e
            expect(translate('кә')).toBe('kə');
            expect(translate('кө')).toBe('kö');
            expect(translate('кү')).toBe('kü');
            expect(translate('кэ')).toBe('ke');
        });
    test('correctly parse г in back vowels', () => {
        expect(translate('га')).toBe('ğa'); // russian a
        expect(translate('гa')).toBe('ğa'); // latin a
        expect(translate('го')).toBe('ğo');
        expect(translate('гу')).toBe('ğu'); // russian y
        expect(translate('гy')).toBe('ğu'); // latin y
        expect(translate('ги')).toBe('ği');
        expect(translate('гы')).toBe('ğı');
        expect(translate('гый')).toBe('ğıy');
    }),
        test('correctly parse г in front vowels', () => {
            expect(translate('ге')).toBe('ge'); // russian e
            expect(translate('гe')).toBe('ge'); // latin e
            expect(translate('гә')).toBe('gə');
            expect(translate('гө')).toBe('gö');
            expect(translate('гү')).toBe('gü');
            expect(translate('гэ')).toBe('ge');
        }),
        test('correctly parse "e" after consonants', () => {
            expect(translate('ке')).toBe('ke');
            expect(translate('ге')).toBe('ge');
            expect(translate('де')).toBe('de');
            expect(translate('же')).toBe('je');
            expect(translate('зе')).toBe('ze');
            expect(translate('йе')).toBe('ye');
            expect(translate('ле')).toBe('le');
            expect(translate('ме')).toBe('me');
            expect(translate('не')).toBe('ne');
            expect(translate('ңе')).toBe('ñe');
            expect(translate('пе')).toBe('pe');
            expect(translate('ре')).toBe('re');
            expect(translate('се')).toBe('se');
            expect(translate('те')).toBe('te');
            expect(translate('фе')).toBe('fe');
            expect(translate('хе')).toBe('xe');
            expect(translate('һе')).toBe('he');
            expect(translate('че')).toBe('çe');
            expect(translate('ше')).toBe('şe');
            expect(translate('җе')).toBe('ce');
            expect(translate('це')).toBe('tse');
            expect(translate('ще')).toBe('şçe');
        });
    test('correctly parse "e" after back vowels', () => {
        expect(translate('га')).toBe('ğa'); // russian a
        expect(translate('гa')).toBe('ğa'); // latin a
        expect(translate('го')).toBe('ğo');
        expect(translate('гу')).toBe('ğu'); // russian y
        expect(translate('гy')).toBe('ğu'); // latin y
        expect(translate('ги')).toBe('ği');
        expect(translate('гы')).toBe('ğı');
        expect(translate('гый')).toBe('ğıy');
    });
    test('correctly parse "ё" in russian loanwords', () => {
        expect(translate('гё')).toBe('ğyo'); // russian г
        expect(translate('гё')).toBe('ğyo'); // latin г
    });
});
