import * as ohm from 'ohm-js';

const mapping: { [key: string]: { [key: string]: { [key: string]: string } } } = {
    'Cyrillic': {
        'NeoAlif': {
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
            "g_back_vowel": "ğ", "g_front_vowel": "g"
        }
    }
};
const g = ohm.grammar(`Cyrillic {
    input = (syllable | cyrillic_letter | any)*
    cyrillic_letter = (consonant | front_vowel | back_vowel)
    syllable = "г" &front_vowel -- g_front_vowel
                | "г" &back_vowel -- g_back_vowel
    consonant = "б" | "в" | "д" | "ж" | "г" | "з" | "й" | "к" | "л" | "м" | "н" | "ң" | "п" | "р" | "с" | "т" | "ф" | "х" | "һ" | "ч" | "ш" | "җ" | "ц" | "щ"
    front_vowel = "ә" | "ө" | "ү" | "е" | "e" | "э"
    back_vowel = "а" | "a" | "о" | "o" | "у" | "y" | "ы" | "и" | "ый"
}`)

const semantics = g.createSemantics().addOperation('translate', {
    _terminal() {
        return this.sourceString;
    },
    input(ps) {
        return ps.children.map(c => c.translate()).join('');
    },
    syllable_g_front_vowel(_syllable, _vowel) {
        return getEquivalent("g_front_vowel")
    },
    syllable_g_back_vowel(_syllable, _vowel) {
        return getEquivalent("g_back_vowel")
    },
    cyrillic_letter(ps) {
        return ps.children.map(c => getEquivalent(c.sourceString)).join('');
    },
})

function getEquivalent(c: string): string {
    let equivalent = mapping['Cyrillic']['NeoAlif'][c] || '?';

    return c === equivalent.toUpperCase() ?
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
