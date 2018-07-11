"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
class Cart {
    constructor(data) {
        this.userID = data.userID;
        this._items = {};
        data.items.forEach(item => (this._items[item.id] = item));
    }
    get total() {
        return this.getAllItems().reduce((total, item) => total + item.price * item.quantity, 0);
    }
    async addItem(item) {
        const data = this.toJSON();
        const foundItem = data.items.find(i => i.id === item.id);
        if (foundItem === undefined) {
            data.items.push(Object.assign({}, item, { quantity: 1 }));
        }
        else {
            foundItem.quantity++;
        }
        const newCart = new Cart(data);
        return updateCart(newCart);
    }
    getItem(itemID) {
        if (this._items[itemID] === undefined)
            return null;
        return this._items[itemID];
    }
    getAllItems() {
        return Object.values(this._items);
    }
    toJSON() {
        return { items: this.getAllItems(), userID: this.userID };
    }
}
exports.Cart = Cart;
exports.addToCart = async (user, item) => {
    return exports.getCart(user).then(cart => cart.addItem(item));
};
const CARTS_DB_PATH = path_1.join(__dirname, './.carts');
exports.getCart = (user) => {
    const fullPath = `${CARTS_DB_PATH}/${user.id}`;
    return new Promise((resolve, reject) => {
        fs_1.readFile(fullPath, (err, maybeCart) => {
            if (err)
                reject(err);
            try {
                const cart = new Cart(validateJSONCart(maybeCart));
                resolve(cart);
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
const updateCart = async (updatedCart) => {
    const fileData = JSON.stringify(updatedCart);
    const fullPath = `${CARTS_DB_PATH}/${updatedCart.userID}`;
    return new Promise((resolve, reject) => {
        fs_1.writeFile(fullPath, fileData, err => {
            if (err)
                reject(err);
            resolve(updatedCart);
        });
    });
};
const throws = (fn, ...args) => {
    try {
        fn(...args);
        return false;
    }
    catch (err) {
        return true;
    }
};
const validateJSONCart = (maybeCart = {}) => {
    if (!(maybeCart.items instanceof Array) ||
        maybeCart.items.some(item => throws(validateCartMenuItem, item)))
        throw new Error('Invalid cart');
    const items = maybeCart.items;
    if (typeof maybeCart.userID !== 'string' || maybeCart.userID.trim() === '')
        throw new Error('Invalid cart');
    const userID = maybeCart.userID;
    return { items, userID };
};
const validateCartMenuItem = (maybeCartMenuItem = {}) => {
    if (typeof maybeCartMenuItem.id !== 'string' ||
        maybeCartMenuItem.id.trim() === '')
        throw new Error('Invalid cart menu item');
    const id = maybeCartMenuItem.id;
    if (typeof maybeCartMenuItem.title !== 'string' ||
        maybeCartMenuItem.title.trim() === '')
        throw new Error('Invalid cart menu item');
    const title = maybeCartMenuItem.title.trim();
    if (typeof maybeCartMenuItem.price !== 'number')
        throw new Error('Invalid cart menu item');
    const price = maybeCartMenuItem.price;
    if (typeof maybeCartMenuItem.quantity !== 'number')
        throw new Error('Invalid cart menu item');
    const quantity = maybeCartMenuItem.quantity;
    return { id, title, price, quantity };
};
