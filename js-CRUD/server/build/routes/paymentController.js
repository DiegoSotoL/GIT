"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = __importDefault(require("../controllers/paymentController"));
class PaymentRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', paymentController_1.default.list);
        this.router.get('/:id', paymentController_1.default.getOne);
        this.router.post('/', paymentController_1.default.create);
        this.router.delete('/:id', paymentController_1.default.delete);
        this.router.put('/:id', paymentController_1.default.update);
    }
}
const paymentRoutes = new PaymentRoutes();
exports.default = paymentRoutes.router;
