// Валидаторы форм
export const validators = {
    // Валидация email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Валидация телефона
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    // Валидация URL
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    // Проверка на пустую строку
    isEmpty(value) {
        return !value || value.trim() === '';
    },

    // Минимальная длина
    minLength(value, min) {
        return value && value.length >= min;
    },

    // Максимальная длина
    maxLength(value, max) {
        return value && value.length <= max;
    }
};
