"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileUserController = void 0;
const ProfileUserService_1 = require("../services/ProfileUserService");
class ProfileUserController {
    async handle(req, res) {
        const { user_id } = req;
        const service = new ProfileUserService_1.ProfileUserService();
        const result = await service.execute(user_id);
        return res.json(result);
    }
}
exports.ProfileUserController = ProfileUserController;
