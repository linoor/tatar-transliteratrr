import { translate } from './ohm';

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputArea') as HTMLTextAreaElement;
    const outputArea = document.getElementById('outputArea') as HTMLTextAreaElement;
    const latinAlphabetSelect = document.getElementById('latinAlphabetSelect') as HTMLSelectElement;

    const selectedLatinAlphabet = () => latinAlphabetSelect.value;
    const updateOutputFromInput = () => {
        outputArea.value = translate("Cyrillic", selectedLatinAlphabet(), inputArea.value);
    };

    inputArea.addEventListener('input', () => {
        updateOutputFromInput();
    })
    latinAlphabetSelect.addEventListener('change', () => {
        updateOutputFromInput();
    });
    outputArea.addEventListener('input', () => {
        const outputText = outputArea.value;

        inputArea.value = translate(selectedLatinAlphabet(), "Cyrillic", outputText);
    })
});
