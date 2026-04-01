# Лабораторная работа №4. Продвинутые объекты в JavaScript

## Цель работы

Познакомиться с классами и объектами в JavaScript, научиться создавать классы, использовать конструкторы и методы, а также реализовать наследование.

---

## Условие

Создать консольное приложение, моделирующее систему инвентаря, где можно добавлять предметы, изменять их свойства и управлять ими.

---

## Шаг 1. Создание класса `Item`

Класс `Item` представляет предмет в инвентаре.

**Поля класса:**

- `name` — название предмета.
- `weight` — вес предмета (кг).
- `rarity` — редкость: `common`, `uncommon`, `rare`, `legendary`.

**Методы:**

- `getInfo()` — возвращает строку с информацией о предмете.
- `setWeight(newWeight)` — изменяет вес предмета.

**Реализация:**

```javascript
class Item {
    constructor(name, weight, rarity) {
        this.name = name;
        this.weight = weight;
        this.rarity = rarity;
    }

    /**
     * Возвращает строку с информацией о предмете
     * @returns {string} строка вида "название | вес | редкость"
     */
    getInfo() {
        return this.name + "|" + this.weight + "|" + this.rarity;
    }

    /**
     * Изменяет вес предмета
     * @param {number} newWeight - новый вес
     */
    setWeight(newWeight) {
        this.weight = newWeight;
    }
}
```

**Пример использования:**

```javascript
const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo()); // Steel Sword|3.5|rare
sword.setWeight(4.0);
```

---

## Шаг 2. Создание класса `Weapon`

Класс `Weapon` расширяет `Item` и добавляет поля и методы, специфичные для оружия.

**Дополнительные поля:**

- `damage` — урон оружия.
- `durability` — прочность (от 0 до 100).

**Дополнительные методы:**

- `use()` — уменьшает `durability` на 10, если `durability > 0`.
- `repair()` — восстанавливает `durability` до 100.
- `getInfo()` — переопределяет родительский метод, добавляя `damage` и `durability`.

**Реализация:**

```javascript
class Weapon extends Item {
    constructor(name, weight, rarity, damage, durability) {
        super(name, weight, rarity);
        this.damage = damage;
        this.durability = durability;
    }

    /**
     * Прочность - 10
     * @returns {number}
     */
    use() {
        if (this.durability > 0) return this.durability -= 10;
    }

    /**
     * Прочность = 100
     * @returns {number}
     */
    repair() {
        return this.durability = 100;
    }

    /**
     * Вывод информации в виде строки, добавляя damage и durability
     * @returns {string}
     */
    getInfo() {
        return super.getInfo() + "|" + this.damage + "|" + this.durability;
    }
}
```

**Пример использования:**

```javascript
const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo()); // Longbow|2|uncommon|15|100
bow.use();
console.log(bow.durability); // 90
bow.repair();
```

---

## Шаг 3. Тестирование

### Объекты класса `Item`

```javascript
// Кирка
const pickaxe = new Item("Pickaxe", 4.2, "common");
console.log(pickaxe.getInfo()); // Pickaxe|4.2|common
pickaxe.setWeight(3.8);
console.log(pickaxe.weight);    // 3.8

// Топор
const hatchet = new Item("Hatchet", 2.5, "uncommon");
console.log(hatchet.getInfo()); // Hatchet|2.5|uncommon
hatchet.setWeight(2.8);
console.log(hatchet.weight);    // 2.8
```

### Объекты класса `Weapon`

```javascript
// Арбалет
const crossbow = new Weapon("Crossbow", 5.0, "rare", 40, 100);
console.log(crossbow.getInfo()); // Crossbow|5|rare|40|100
crossbow.use();
crossbow.use();
console.log(crossbow.durability); // 80
crossbow.repair();
console.log(crossbow.durability); // 100

// Лук
const shortbow = new Weapon("Shortbow", 1.5, "common", 12, 100);
console.log(shortbow.getInfo()); // Shortbow|1.5|common|12|100
shortbow.use();
console.log(shortbow.durability); // 90
shortbow.repair();
console.log(shortbow.durability); // 100
```

### Результаты тестирования

| Объект | Метод | Ожидаемый результат | Фактический результат |
|---|---|---|---|
| `pickaxe` | `getInfo()` | `Pickaxe\|4.2\|common` | ✅ Совпадает |
| `pickaxe` | `setWeight(3.8)` | `weight = 3.8` | ✅ Совпадает |
| `hatchet` | `getInfo()` | `Hatchet\|2.5\|uncommon` | ✅ Совпадает |
| `hatchet` | `setWeight(2.8)` | `weight = 2.8` | ✅ Совпадает |
| `crossbow` | `getInfo()` | `Crossbow\|5\|rare\|40\|100` | ✅ Совпадает |
| `crossbow` | `use()` × 2 | `durability = 80` | ✅ Совпадает |
| `crossbow` | `repair()` | `durability = 100` | ✅ Совпадает |
| `shortbow` | `use()` | `durability = 90` | ✅ Совпадает |
| `shortbow` | `repair()` | `durability = 100` | ✅ Совпадает |

---

## Шаг 4. Функция-конструктор и опциональная цепочка

### Функция-конструктор `ItemFun`

Аналог класса `Item`, реализованный через функцию-конструктор с добавлением методов через `prototype`.

```javascript
/**
 * Функция-конструктор предмета.
 * @constructor
 * @param {string} name
 * @param {number} weight
 * @param {string} rarity
 */
function ItemFun(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
}

ItemFun.prototype.getInfo = function() {
    return this.name + "|" + this.weight + "|" + this.rarity;
};

ItemFun.prototype.setWeight = function(newWeight) {
    this.weight = newWeight;
};
```

### Функция-конструктор `WeaponFun`

Наследует `ItemFun` через `ItemFun.call()` и `Object.create()`.

```javascript
/**
 * Функция-конструктор оружия.
 * @constructor
 * @param {string} name
 * @param {number} weight
 * @param {string} rarity
 * @param {number} damage
 * @param {number} durability
 */
function WeaponFun(name, weight, rarity, damage, durability) {
    ItemFun.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
}

WeaponFun.prototype = Object.create(ItemFun.prototype);
WeaponFun.prototype.constructor = WeaponFun;

WeaponFun.prototype.use = function() {
    if (this.durability > 0) this.durability -= 10;
};

WeaponFun.prototype.repair = function() {
    this.durability = 100;
};
```

### Опциональная цепочка `?.`

Оператор `?.` позволяет безопасно обращаться к свойствам объекта — если объект равен `null` или `undefined`, выражение вернёт `undefined` вместо ошибки.

```javascript
const axe = new WeaponFun("Axe", 3, "rare", 30, 90);
console.log(axe.getInfo()); // Axe|3|rare|30|90
axe.use();
console.log(axe?.durability); // 80 — безопасный доступ через ?.
```

---

## Контрольные вопросы

**1. Какое значение имеет `this` в методах класса?**

`this` — ссылка на текущий экземпляр объекта, для которого вызывается метод. Например, при вызове `sword.getInfo()` ключевое слово `this` внутри метода указывает именно на объект `sword`, обеспечивая доступ к его полям (`this.name`, `this.weight` и т.д.). Важно учитывать, что если метод передаётся как колбэк без привязки, `this` может стать `undefined` (в strict mode) или `window` (в браузере без strict mode).

**2. Как работает модификатор доступа `#` в JavaScript?**

Символ `#` перед именем поля или метода делает его приватным — доступным только внутри тела того класса, в котором оно объявлено. Попытка обратиться к нему извне (`instance.#field`) вызывает `SyntaxError`. Это обеспечивает настоящую инкапсуляцию, в отличие от соглашения `_field`, которое было лишь условностью и не ограничивало доступ технически.

```javascript
class Test {
    #secret = 10;
    getSecret() { return this.#secret; } // ✅ внутри класса — доступно
}

const t = new Test();
console.log(t.#secret); // ❌ SyntaxError: доступ закрыт
```

**3. В чём разница между `классами` и `функциями-конструкторами`?**

| Критерий | `class` | Функция-конструктор |
|---|---|---|
| Синтаксис | Современный (ES6+) | Устаревший, на основе `prototype` |
| Наследование | `extends` / `super` | `Object.create()` + ручная настройка |
| Вызов без `new` | Всегда `TypeError` | Может быть вызвана случайно без `new` |
| Hoisting | Не поднимается | Поднимается (function declaration) |
| Приватные поля | Поддерживает `#` | Не поддерживает |

По сути оба механизма используют прототипное наследование под капотом. `class` — это синтаксический сахар, делающий код чище и безопаснее.

---

