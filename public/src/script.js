import { translate } from './ohm';
document.addEventListener('DOMContentLoaded', () => {
    const inputArea = document.getElementById('inputArea');
    const outputArea = document.getElementById('outputArea');
    inputArea.addEventListener('input', () => {
        const inputText = inputArea.value;
        outputArea.value = translate(inputText);
    });
});
