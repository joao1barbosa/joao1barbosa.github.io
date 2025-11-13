document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') applyTheme(true);

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const isCurrentlyDark = body.classList.contains('dark-mode');
            // Aplica o tema oposto
            applyTheme(!isCurrentlyDark); 
        });
    }
});