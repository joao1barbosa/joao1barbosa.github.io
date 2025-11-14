document.addEventListener('DOMContentLoaded', () => {
    const toggleThemeButton = document.getElementById('theme-toggle');
    const toggleLangButton = document.getElementById('lang-toggle');
    const body = document.body;
    const html = document.html;

    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    function applyLanguage(isPortuguese) {
        if (isPortuguese) {
            html.classList.add('pt-BR');
            localStorage.setItem('language', 'en');
        } else {
            html.classList.remove('pt-BR');
            localStorage.setItem('language', 'pt');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('language');

    if (savedTheme === 'dark') applyTheme(true);
    if (savedLang === 'pt') applyLanguage(true);

    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', () => {
            const isCurrentlyDark = body.classList.contains('dark-mode');
            applyTheme(!isCurrentlyDark); 
        });
    }

    if (toggleLangButton) {
        toggleLangButton.addEventListener('click', () => {
            const isCurrentlyPt = body.classList.contains('pt');
            applyLanguage(!isCurrentlyPt); 
        });
    }
});