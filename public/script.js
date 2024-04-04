"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputArea');
    const outputArea = document.getElementById('outputArea');
    const mappings = {
        'Cyrillic': {
            'ISO-9': {
                'а': 'a',
                'ә': 'ä',
                'б': 'b',
                'в': 'v',
                'г': 'g',
                'д': 'd',
                'е': 'ê',
                'ё': 'ô',
                'ж': 'ž',
                'җ': 'ẓ̌',
                'з': 'z',
                'и': 'i',
                'й': 'j',
                'к': 'k',
                'л': 'l',
                'м': 'm',
                'н': 'n',
                'ң': 'ņ',
                'о': 'o',
                'ө': 'ô',
                'п': 'p',
                'р': 'r',
                'с': 's',
                'т': 't',
                'у': 'u',
                'ү': 'ù',
                'ф': 'f',
                'х': 'h',
                'һ': 'ḩ',
                'ц': 'c',
                'ч': 'č',
                'ш': 'š',
                'щ': 'ŝ',
                'ъ': '”',
                'ы': 'y',
                'ь': '’',
                'э': 'e',
                'ю': 'û',
                'я': 'â',
            }
        }
    };
    const sourceAlphabet = 'Cyrillic';
    const targetAlphabet = 'ISO-9';
    inputArea.addEventListener('input', () => {
        const inputText = inputArea.value;
        let translatedText = '';
        for (const char of inputText) {
            const replacement = mappings[sourceAlphabet][targetAlphabet][char.toLowerCase()];
            if (replacement !== undefined) {
                translatedText +=
                    char === char.toLowerCase()
                        ? replacement
                        : replacement.toUpperCase();
            }
            else {
                translatedText += char;
            }
        }
        outputArea.value = translatedText;
    });
});
