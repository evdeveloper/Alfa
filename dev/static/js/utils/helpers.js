// Утилиты и вспомогательные функции
export const helpers = {
    // Дебаунс функция
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Троттлинг функция
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Проверка на мобильное устройство
    isMobile() {
        return window.innerWidth <= 768;
    },

    // Плавная прокрутка к элементу
    smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    // Получение элемента по селектору
    $(selector) {
        return document.querySelector(selector);
    },

    // Получение всех элементов по селектору
    $$(selector) {
        return document.querySelectorAll(selector);
    }
};
