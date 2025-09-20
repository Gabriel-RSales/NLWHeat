"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const axios_1 = __importDefault(require("axios"));
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    async execute(code) {
        const url = "https://github.com/login/oauth/access_token";
        const { data: accessToken } = await axios_1.default.post(url, null, {
            params: {
                client_id: process.env.GITHUB_C,
                client_secret: process.env.GITHUB_C_SECRET,
                code,
            },
            headers: {
                Accept: "application/json",
            }
        });
        const response = await axios_1.default.get("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessToken.access_token}`,
            }
        });
        const { login, id, avatar_url, name } = response.data;
        let user = await prisma_1.default.user.findFirst({
            where: {
                github_id: id
            }
        });
        if (!user) {
            user = await prisma_1.default.user.create({
                data: {
                    login,
                    github_id: id,
                    avatar_url,
                    name
                }
            });
        }
        const token = (0, jsonwebtoken_1.sign)({
            user: {
                login: user.login,
                id: user.id,
                avatar_url: user.avatar_url,
            }
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: "1d"
        });
        return { token, user };
    }
}
exports.AuthUserService = AuthUserService;
