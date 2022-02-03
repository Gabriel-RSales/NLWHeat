import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface IAccessToken {
    access_token: string;
}

interface IUser {
    login: string,
    id: number,
    avatar_url: string,
    name: string
}

class AuthUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessToken } = await axios.post<IAccessToken>(url, null, {
            params: {
                client_id: process.env.GITHUB_C,
                client_secret: process.env.GITHUB_C_SECRET,
                code,
            },
            headers: {
                Accept: "application/json",
            }
        });

        const response = await axios.get<IUser>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${accessToken.access_token}`,
            }
        });

        const { login, id, avatar_url, name } = response.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if(!user) {
            user = await prismaClient.user.create({
                data: {
                    login,
                    github_id: id,
                    avatar_url,
                    name
                }
            })
        }

        const token = sign(
            {
                user: {
                    login: user.login,
                    id: user.id,
                    avatar_url: user.avatar_url,
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )

        return { token, user };
    }
}

export { AuthUserService };