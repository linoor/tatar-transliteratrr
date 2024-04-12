
import * as ohm from 'ohm-js';

const Cyrillic = 'Cyrillic';
const NeoAlif = 'NeoAlif';
type Alphabet = string
type Rule = string
type Letter = string

// typedef 
const mapping: { [key: Alphabet]: { [key: Alphabet]: { [key: Rule]: { [key: Letter]: Letter } } } } = {
    'Cyrillic': {
        'NeoAlif': {
            "default": {
                'а': 'a', 'ә': 'ə', 'б': 'b',
                "a": "a", "e": "e", "o": "o", "y": "u",
                'җ': 'c', 'ч': 'ç', 'д': 'd',
                'э': 'e', 'ф': 'f', "г": "g",
                'һ': 'h', 'ы': 'ı', 'и': 'i',
                'ж': 'j', 'к': 'k', 'л': 'l',
                'м': 'm', 'н': 'n', 'ң': 'ñ',
                'о': 'o', 'ө': 'ö', 'п': 'p',
                'р': 'r', 'с': 's', 'ш': 'ş',
                'т': 't', 'у': 'u', 'ү': 'ü',
                'в': 'w', 'х': 'x', 'й': 'y',
                'з': 'z', 'ь': "'", 'я': 'ya',
                'е': 'e', 'Е': 'e', 'c': 's',
                // for russian loanwords below
                'ц': 'ts', 'щ': 'şç', "ё": "yo"
            },
            "before_back_vowel": {
                "к": "q", "г": "ğ"
            },
            "before_front_vowel": {
                "к": "k", "г": "g"
            },
        }
    },
    'NeoAlif': {
        'Cyrillic': {
            "default": {
                'a': 'а', 'ə': 'ә', 'b': 'б',
                'c': 'җ', 'ç': 'ч', 'd': 'д',
                'e': 'е', 'f': 'ф', 'g': 'г',
                'h': 'һ', 'ı': 'ы', 'i': 'и',
                'j': 'ж', 'k': 'к', 'l': 'л',
                'm': 'м', 'n': 'н', 'ñ': 'ң',
                's': 'с', 'o': 'о', 'ö': 'ө',
                'y': 'й', 'p': 'п', 'r': 'р',
                'q': 'к', 't': 'т', 'u': 'у',
                'z': 'з', 'w': 'в', 'x': 'х',
                "ü": "ү", "yo": "ё", 'ş': 'ш',
                "ğ": "г", "ts": "ц", "şç": "щ",
            }, 
            "syllable": {
                'ya': 'я'
            },
            "e_beginning": {
                'e': 'э'
            }
        }
    }
};
const grammar_cyrillic = ohm.grammar(`Cyrillic {
    input = (syllable | cyrillic_letter | any)*
    cyrillic_letter = (consonant | front_vowel | back_vowel)
    syllable = g_front_vowel | g_back_vowel | k_front_vowel | k_back_vowel

    g_front_vowel = ("г" | "Г")  &(front_vowel)
    g_back_vowel = ("г" | "Г")  &(back_vowel | "ё")

    k_front_vowel = ("к" | "К")  &front_vowel
    k_back_vowel = ("к" | "К")  &back_vowel

    consonant = consonant_lowercase | consonant_uppercase
    consonant_lowercase = "б" | "в" | "д" | "ж" | "г" | "з" | "й" | "к" | "л" | "м" | "н" | "ң" | "п" | "р" | "с" | "т" | "ф" | "х" | "һ" | "ч" | "ш" | "җ" | "ц" | "щ" | "я" | "ё" 
    consonant_uppercase = "Б" | "В" | "Д" | "Ж" | "Г" | "З" | "Й" | "К" | "Л" | "М" | "Н" | "Ң" | "П" | "Р" | "С" | "Т" | "Ф" | "Х" | "Һ" | "Ч" | "Ш" | "Җ" | "Ц" | "Щ" | "Я" | "Ё"

    front_vowel = front_vowel_lower | front_vowel_upper
    front_vowel_lower = "ә" | "ө" | "ү" | "е" | "e" | "э" | "и"
    front_vowel_upper = "Ә" | "Ө" | "Ү" | "Е" | "E" | "Э" | "И"

    back_vowel = back_vowel_lower | back_vowel_upper
    back_vowel_lower = "а" | "a" | "о" | "o" | "у" | "y" | "ы"
    back_vowel_upper = "А" | "A" | "О" | "O" | "У" | "Y" | "Ы"
}`)

const semantics_cyrillic = grammar_cyrillic.createSemantics().addOperation('translate', (() => {
    const from = Cyrillic
    const to = NeoAlif

    return {
        _terminal() {
            return this.sourceString;
        },
        input(ps) {
            return ps.children.map(c => c.translate()).join('');
        },
        g_front_vowel(syllable, _vowel) {
            return getEquivalent(syllable.sourceString, from, to, "before_front_vowel");
        },
        g_back_vowel(syllable, _vowel) {
            return getEquivalent(syllable.sourceString, from, to, "before_back_vowel");
        },
        k_back_vowel(syllable, _vowel) {
            return getEquivalent(syllable.sourceString, from, to, "before_back_vowel");
        },
        k_front_vowel(syllable, _vowel) {
            return getEquivalent(syllable.sourceString, from, to, "before_front_vowel");
        },
        cyrillic_letter(ps) {
            return ps.children.map(c => getEquivalent(c.sourceString, Cyrillic, NeoAlif)).join('');
        },
    }
})())

function getEquivalent(c: string, from: string, to: string, rule = "default"): string {
    const equivalent = mapping[from][to][rule][c.toLowerCase()] || '?';

    return c === c.toUpperCase() ?
        equivalent.toUpperCase() :
        equivalent;
}

function getGrammar(from: Alphabet, to: Alphabet): [ohm.Grammar, ohm.Semantics] {
    if (from === 'Cyrillic' && to === 'NeoAlif') {
        return [grammar_cyrillic, semantics_cyrillic]
    } else if (from === 'NeoAlif' && to === 'Cyrillic') {
        return [grammar_latin, semantics_latin]
    } else {
        throw new Error("Not supported")
    }
}


export function translate(from: Alphabet, to: Alphabet, text: string) {
    const [grammar, semantics] = getGrammar(from, to)
    const match = grammar.match(text)
    if (match.succeeded()) {
        return semantics(match).translate();
    } else {
        return match.message
    }
}

const grammar_latin = ohm.grammar(`Latin {
    input = (syllable | e_beginning | latin_letter | any)*
    latin_letter = letter | "ә"
    e_beginning = space "e"
    syllable = ("ya")
}`)
const semantics_latin = grammar_latin.createSemantics().addOperation('translate', (() => {
    const from = NeoAlif
    const to = Cyrillic

    return {
        _terminal() {
            return this.sourceString;
        },
        input(ps) {
            return ps.children.map(c => c.translate()).join('');
        },
        syllable(ps) {
            return getEquivalent(ps.sourceString, from, to, "syllable");
        },
        e_beginning(_, ps) {
            return " " + getEquivalent("e", from, to, "e_beginning");
        },
        latin_letter(ps) {
            return getEquivalent(ps.sourceString, from, to);
        },
    }
})())