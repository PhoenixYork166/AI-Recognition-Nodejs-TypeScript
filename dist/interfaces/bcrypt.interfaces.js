"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Implementation of the interfaces
class BcryptService {
    async hash(password, saltOrRounds) {
        return bcryptjs_1.default.hash(password, saltOrRounds);
    }
    async compare(password, hash) {
        return bcryptjs_1.default.compare(password, hash);
    }
}
exports.BcryptService = BcryptService;
//# sourceMappingURL=bcrypt.interfaces.js.map