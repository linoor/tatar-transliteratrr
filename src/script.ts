import * as ohm from 'ohm-js';

const mapping: { [key: string]: { [key: string]: { [key: string]: { [key: string]: string } } } } = {
    'Cyrillic': {
        'NeoAlif': {
            "default": {
                'а': 'a', 'ә': 'ə', 'б': 'b',
                "a": "a", "e": "e", "o": "o", "y": "y",
                'җ': 'c', 'ч': 'ç', 'д': 'd',
                'э': 'e', 'ф': 'f', "г": "g",
                'һ': 'h', 'ы': 'ı', 'и': 'i',
                'ж': 'j', 'к': 'k', 'л': 'l',
                'м': 'm', 'н': 'n', 'ң': 'ñ',
                'о': 'o', 'ө': 'ö', 'п': 'p',
                'р': 'r', 'с': 's', 'ш': 'ş',
                'т': 't', 'у': 'u', 'ү': 'ü',
                'в': 'v', 'х': 'x', 'й': 'y',
                'з': 'z', 'ь': "'", 'я': 'ya',
                'е': 'e', 'Е': 'e',
            },
            "before_back_vowel": {
                "к": "q", "г": "ğ"
            },
            "before_front_vowel": {
                "к": "k", "г": "g"
            },
        }
    }
};
const g = ohm.grammar(`Cyrillic {
    input = (syllable | cyrillic_letter | any)*
    cyrillic_letter = (consonant | front_vowel | back_vowel)
    syllable = g_front_vowel | g_back_vowel | k_front_vowel | k_back_vowel

    g_front_vowel = ("г" | "Г")  &front_vowel
    g_back_vowel = ("г" | "Г")  &back_vowel

    k_front_vowel = ("к" | "К")  &front_vowel
    k_back_vowel = ("к" | "К")  &back_vowel

    consonant = consonant_lowercase | consonant_uppercase
    consonant_lowercase = "б" | "в" | "д" | "ж" | "г" | "з" | "й" | "к" | "л" | "м" | "н" | "ң" | "п" | "р" | "с" | "т" | "ф" | "х" | "һ" | "ч" | "ш" | "җ" | "ц" | "щ" | "я" 
    consonant_uppercase = "Б" | "В" | "Д" | "Ж" | "Г" | "З" | "Й" | "К" | "Л" | "М" | "Н" | "Ң" | "П" | "Р" | "С" | "Т" | "Ф" | "Х" | "Һ" | "Ч" | "Ш" | "Җ" | "Ц" | "Щ" | "Я"

    front_vowel = front_vowel_lower | front_vowel_upper
    front_vowel_lower = "ә" | "ө" | "ү" | "е" | "e" | "э"
    front_vowel_upper = "Ә" | "Ө" | "Ү" | "Е" | "E" | "Э"

    back_vowel = back_vowel_lower | back_vowel_upper
    back_vowel_lower = "а" | "a" | "о" | "o" | "у" | "y" | "ы" | "и" | "ый"
    back_vowel_upper = "А" | "A" | "О" | "O" | "У" | "Y" | "Ы" | "И" | "ЫЙ"
}`)

const semantics = g.createSemantics().addOperation('translate', {
    _terminal() {
        return this.sourceString;
    },
    input(ps) {
        return ps.children.map(c => c.translate()).join('');
    },
    g_front_vowel(syllable, _vowel) {
        return getEquivalent(syllable.sourceString, "before_front_vowel")
    },
    g_back_vowel(syllable, _vowel) {
        return getEquivalent(syllable.sourceString, "before_back_vowel")
    },
    k_back_vowel(syllable, _vowel) {
        debugger;
        return getEquivalent(syllable.sourceString, "before_back_vowel")
    },
    k_front_vowel(syllable, _vowel) {
        return getEquivalent(syllable.sourceString, "before_front_vowel")
    },
    cyrillic_letter(ps) {
        return ps.children.map(c => getEquivalent(c.sourceString)).join('');
    },
})

function getEquivalent(c: string, rule = "default"): string {
    const equivalent = mapping['Cyrillic']['NeoAlif'][rule][c.toLowerCase()] || '?';

    return c === c.toUpperCase() ?
        equivalent.toUpperCase() :
        equivalent;
}

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
