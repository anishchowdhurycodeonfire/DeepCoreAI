document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isExpanded = item.getAttribute('aria-expanded') === 'true';
            item.setAttribute('aria-expanded', !isExpanded);
        });
    });
})




















const codeString = `
send(to, from, count)
register short *to, *from;
register int count;
{
    register int n = (count + 7) / 8;
    switch (count % 8) {
    case 0: do { *to = *from++;
    case 7:      *to = *from++;
    case 6:      *to = *from++;
    case 5:      *to = *from++;
    case 4:      *to = *from++;
    case 3:      *to = *from++;
    case 2:      *to = *from++;
    case 1:      *to = *from++;
            } while (--n > 0);
    }
}
`;

let index = 0;
const codeDisplay = document.querySelector('#code-display code');
const typingSpeed = 20;

function typeCode() {
    if (index < codeString.length) {
        codeDisplay.textContent += codeString[index];
        index++;
        hljs.highlightElement(codeDisplay); // Re-apply highlighting
        setTimeout(typeCode, typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', typeCode);
