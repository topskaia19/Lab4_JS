
// Шаг 1. Создание класса Item
/**
   * Создаёт новый предмет инвентаря.
   *
   * @param {string}  name    - Название предмета.
   * @param {number}  weight  - Вес предмета (кг).
   * @param {Rarity}  rarity  - Редкость предмета.
   */

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

// Пример использования:

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);

// Шаг 2. Создание класса Weapon
    /**
     * @param {name} название предмета
     * @param {weight} вес предмета
     * @param {rarity} редкость предмета (common, uncommon, rare, legendary)
     * @param {damage} урон оружия
     * @param {durability} прочность (от 0 до 100).
     */

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

// Пример использования:

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log(bow.durability); // должно уменьшиться
bow.repair();

// Шаг 3. Создание классов для тестирования

// Пример использования: Кирка и Топор

const pickaxe = new Item("Pickaxe", 4.2, "common");
console.log(pickaxe.getInfo());
pickaxe.setWeight(3.8);
console.log(pickaxe.weight);

const hatchet = new Item("Hatchet", 2.5, "uncommon");
console.log(hatchet.getInfo());
hatchet.setWeight(2.8);
console.log(hatchet.weight);

// Пример использования: Арбалет и Лук

const crossbow = new Weapon("Crossbow", 5.0, "rare", 40, 100);
console.log(crossbow.getInfo());
crossbow.use();
crossbow.use();
console.log(crossbow.durability);
crossbow.repair();
console.log(crossbow.durability);

const shortbow = new Weapon("Shortbow", 1.5, "common", 12, 100);
console.log(shortbow.getInfo());
shortbow.use();
console.log(shortbow.durability);
shortbow.repair();
console.log(shortbow.durability);

// Шаг 4. Функция-конструктор и опциональная цепочка

/**
 * Функция‑конструктор предмета.
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
}

ItemFun.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
}


/**
 * Функция‑конструктор оружия.
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
    if (this.durability > 0) {
        this.durability -= 10;
    }
};

WeaponFun.prototype.repair = function() {
    this.durability = 100;
};

// Пример использования
const axe = new WeaponFun("Axe", 3, "rare", 30, 90);
console.log(axe.getInfo());
axe.use();
console.log(axe?.durability);

// Контрольные вопросы — краткие ответы
// 1. Какое значение имеет this в методах класса?
// this — это ссылка на текущий объект, для которого вызывается метод.
// То есть this внутри класса указывает на созданный экземпляр.

// 2. Как работает модификатор доступа # в JavaScript?
// # делает свойство приватным.
// К нему нельзя обратиться вне класса.

// class Test {
//     #secret = 10;
// }

// 3. В чем разница между классами и функциями‑конструкторами?
// Синтаксически:  class — современный синтаксис (ES6+), функция-конструктор —
//                      старый, основанный на prototype.
//      Наследование:   class использует extends/super; конструктор требует ручной
//                      настройки цепочки прототипов через Object.create().
//      Обязательность new: вызов класса без new всегда даёт TypeError;
//                      функцию-конструктор можно случайно вызвать без new.
//      Hoisting:       функции-конструкторы поднимаются (hoisting), классы — нет.
//      По сути оба механизма используют прототипное наследование под капотом;
//      class — это синтаксический сахар, делающий код чище и безопаснее.