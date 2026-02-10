# JavaScript модули

Этот проект использует ES6 модули для организации JavaScript кода.

## Структура

```
dev/static/js/
├── main.js              # Главный файл приложения
├── modules/             # Модули приложения
│   ├── header.js        # Модуль header
│   ├── footer.js        # Модуль footer
│   └── navigation.js    # Модуль навигации
└── utils/               # Утилиты
    ├── helpers.js       # Вспомогательные функции
    └── validators.js    # Валидаторы форм
```

## Использование

### Создание нового модуля

1. Создайте файл в папке `modules/` или `utils/`
2. Экспортируйте класс или функции:

```javascript
// modules/myModule.js
export class MyModule {
  constructor() {
    this.init();
  }

  init() {
    console.log("MyModule initialized");
  }
}
```

3. Импортируйте в `main.js`:

```javascript
import { MyModule } from "./modules/myModule.js";

// Использование
const myModule = new MyModule();
```

### Доступные утилиты

После инициализации приложения доступны глобально:

- `window.helpers` - вспомогательные функции
- `window.validators` - валидаторы форм
- `window.app` - главный экземпляр приложения

### Примеры использования

```javascript
// Использование утилит
const isMobile = window.helpers.isMobile();
const debouncedFunction = window.helpers.debounce(myFunction, 300);

// Валидация
const isValidEmail = window.validators.isValidEmail("test@example.com");

// Получение элементов
const element = window.helpers.$(".my-class");
const elements = window.helpers.$$(".my-class");
```

## Сборка

Модули автоматически обрабатываются Gulp и копируются в `build/static/js/` с сохранением структуры модулей. Для всех JavaScript файлов генерируются sourcemaps для удобной отладки.

Для разработки:

```bash
npm run dev
```

Для продакшна:

```bash
npm run build
```

Для запуска с watch и live reload:

```bash
npm start
```
