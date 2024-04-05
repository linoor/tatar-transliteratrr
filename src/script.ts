import * as ohm from 'ohm-js';

const mapping: { [key: string]: { [key: string]: { [key: string]: string } } } = {
    'Cyrillic': {
        'NeoAlif': {
            'А': 'A', 'а': 'a',
            'Ә': 'Ə', 'ә': 'ə',
            'Б': 'B', 'б': 'b',
            'Җ': 'C', 'җ': 'c',
            'Ч': 'Ç', 'ч': 'ç',
            'Д': 'D', 'д': 'd',
            'Э': 'E', 'э': 'e',
            'Ф': 'F', 'ф': 'f',
            'Г': 'G', 'г': 'g',
            'Һ': 'H', 'һ': 'h',
            'Ы': 'I', 'ы': 'ı',
            'И': 'İ', 'и': 'i',
            'Ж': 'J', 'ж': 'j',
            'К': 'K', 'к': 'k',
            'Л': 'L', 'л': 'l',
            'М': 'M', 'м': 'm',
            'Н': 'N', 'н': 'n',
            'Ң': 'Ñ', 'ң': 'ñ',
            'О': 'O', 'о': 'o',
            'Ө': 'Ö', 'ө': 'ö',
            'П': 'P', 'п': 'p',
            'Р': 'R', 'р': 'r',
            'С': 'S', 'с': 's',
            'Ш': 'Ş', 'ш': 'ş',
            'Т': 'T', 'т': 't',
            'У': 'U', 'у': 'u',
            'Ү': 'Ü', 'ү': 'ü',
            'В': 'V', 'в': 'v',
            'Х': 'X', 'х': 'x',
            'Й': 'Y', 'й': 'y',
            'З': 'Z', 'з': 'z',
            'ь': "'",
            'я': 'ya', 'Я': 'Ya',
            'е': 'e', 'Е': 'e',
        }
    }
};
const g = ohm.grammar(`Cyrillic {
    input = (cyrillic_letter | any)*
    cyrillic_letter = uppercaseLetter | lowercaseLetter
    uppercaseLetter = "А" | "Ә" | "Б" | "Җ" | "Ч" | "Д" | "Э" | "Ф" | "Г" | "Һ" | "Ы" | "И" | "Ж" | "К" | "Л" | "М" | "Н" | "Ң" | "О" | "Ө" | "П" | "Р" | "С" | "Ш" | "Т" | "У" | "Ү" | "В" | "Х" | "Й" | "З" | "Ъ" | "Э" | "E" | "Я"
    lowercaseLetter = "а" | "ә" | "б" | "җ" | "ч" | "д" | "э" | "ф" | "г" | "һ" | "ы" | "и" | "ж" | "к" | "л" | "м" | "н" | "ң" | "о" | "ө" | "п" | "р" | "с" | "ш" | "т" | "у" | "ү" | "в" | "х" | "й" | "з" | "ь" | "э" | "е" | "я"
}`)

const semantics = g.createSemantics().addOperation('translate', {
    _terminal() {
        return this.sourceString;
    },
    input(ps) {
        return ps.children.map(c => c.translate()).join('');
    },
    cyrillic_letter(ps) {
        return ps.children.map(c => mapping['Cyrillic']['NeoAlif'][c.sourceString] || '?').join('');
    },
})

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputArea') as HTMLTextAreaElement;
    const outputArea = document.getElementById('outputArea') as HTMLTextAreaElement;

    inputArea.addEventListener('input', () => {
        const inputText = inputArea.value;

        outputArea.value = translate(inputText);
    });

    function translate(text: string) {
        const match = g.match(text);
        if (match.succeeded()) {
            console.log('Syntax is correct!')
            return semantics(match).translate();
        } else {
            return match.message
        }
    }
});
