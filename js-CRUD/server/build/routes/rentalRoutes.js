"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rentalController_1 = __importDefault(require("../controllers/rentalController"));
class RentalRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', rentalController_1.default.list);
        this.router.get('/:id', rentalController_1.default.getOne);
        this.router.post('/', rentalController_1.default.create);
        this.router.delete('/:id', rentalController_1.default.delete);
        this.router.put('/:id', rentalController_1.default.update);
    }
}
const rentalRoutes = new RentalRoutes();
exports.default = rentalRoutes.router;
