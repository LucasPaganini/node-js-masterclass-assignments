"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menuItems = [
    {
        id: '1',
        title: 'Beef',
        price: 50,
    },
    {
        id: '2',
        title: 'Salad',
        price: 30,
    },
];
exports.getMenuItems = () => Promise.resolve(menuItems);
