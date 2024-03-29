"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class StoreController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM store', function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT * FROM store WHERE store_id = ?', [id], function (err, result, fields) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO store set ?', [req.body], function (err, result, field) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM store WHERE store_id= ?', [id], function (err, result, field) {
                if (err)
                    throw err;
                res.json(result);
            });
            res.json({ text: 'eliminanda la tienda con id ?' + req.params.id });
        });
    }
    update(req, res) {
        const { id } = req.params;
        database_1.default.query('UPDATE store set ? WHERE store_id = ?', [req.body, id]);
        res.json({ text: 'actualizanda la tienda con id ? : ' + req.params.id });
    }
}
const storeController = new StoreController();
exports.default = storeController;
