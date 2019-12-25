"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staffController_1 = __importDefault(require("../controllers/staffController"));
class StaffRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', staffController_1.default.list);
        this.router.post('/', staffController_1.default.create);
        this.router.delete('/:id', staffController_1.default.delete);
        this.router.put('/:id', staffController_1.default.update);
    }
}
const staffRoutes = new StaffRoutes();
exports.default = staffRoutes.router;
