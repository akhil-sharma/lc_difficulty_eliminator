/**
 * Adds a css rule to hide the tags which are known to display the problem difficulty.
 */
const eliminationStyle  = `
    .text-olive, .text-yellow, .text-pink, .text-difficulty-easy, .text-difficulty-medium, .text-difficulty-hard {
        display: none;
    }
`;

const eliminationStyleSheet = document.createElement("style");
eliminationStyleSheet.textContent = eliminationStyle;
document.head.appendChild(eliminationStyleSheet);