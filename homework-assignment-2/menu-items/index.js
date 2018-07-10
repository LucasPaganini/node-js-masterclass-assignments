"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menuItems = [
    {
        title: 'Beef',
        price: 50,
    },
    {
        title: 'Salad',
        price: 30,
    },
];
exports.getMenuItems = () => Promise.resolve(menuItems);
