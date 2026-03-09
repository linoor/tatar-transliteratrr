import { translate } from './ohm';

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputArea') as HTMLTextAreaElement;
    const outputArea = document.getElementById('outputArea') as HTMLTextAreaElement;
    const latinAlphabetSelect = document.getElementById('latinAlphabetSelect') as HTMLSelectElement;
    const cyrillicPlaceholder = 'Әхмәт яңа җәйдә бергә вальс-фокста чәчәкле парк, шаян цех, щётка, ёлка, эхо, журнал, юкә һәм күп кыңгырау турында зур шигырь сөйләде.';

    const selectedLatinAlphabet = () => latinAlphabetSelect.value;
    const updatePlaceholders = () => {
        inputArea.placeholder = cyrillicPlaceholder;
        outputArea.placeholder = translate("Cyrillic", selectedLatinAlphabet(), cyrillicPlaceholder);
    };
    const updateOutputFromInput = () => {
        outputArea.value = translate("Cyrillic", selectedLatinAlphabet(), inputArea.value);
    };

    updatePlaceholders();
    inputArea.addEventListener('input', () => {
        updateOutputFromInput();
    })
    latinAlphabetSelect.addEventListener('change', () => {
        updatePlaceholders();
        updateOutputFromInput();
    });
    outputArea.addEventListener('input', () => {
        const outputText = outputArea.value;

        inputArea.value = translate(selectedLatinAlphabet(), "Cyrillic", outputText);
    })
});
