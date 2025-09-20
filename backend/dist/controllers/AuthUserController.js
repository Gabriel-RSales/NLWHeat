"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserService_1 = require("../services/AuthUserService");
class AuthUserController {
    async handle(req, res) {
        const { code } = req.body;
        const service = new AuthUserService_1.AuthUserService();
        try {
            const result = await service.execute(code);
            return res.json(result);
        }
        catch (error) {
            return res.json(error.message);
        }
    }
}
exports.AuthUserController = AuthUserController;
