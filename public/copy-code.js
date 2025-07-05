// public/copy-code.js
window.copyCode = (button) => {
    const code = button.previousElementSibling?.innerText;
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => (button.textContent = "Copy"), 2000);
    });
};
