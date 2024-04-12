import { translate } from './ohm';

document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputArea') as HTMLTextAreaElement;
    const outputArea = document.getElementById('outputArea') as HTMLTextAreaElement;

    inputArea.addEventListener('input', () => {
        const inputText = inputArea.value;

        outputArea.value = translate("Cyrillic", "NeoAlif", inputText);
    })
    outputArea.addEventListener('input', () => {
        const outputText = outputArea.value;

        inputArea.value = translate("NeoAlif", "Cyrillic", outputText);
    })
});
