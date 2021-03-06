import { User } from '../entity/User';
import {sign} from "jsonwebtoken"

export const createAccessToken = (user: User) => {
    return sign(
        {
            userId: user.id, username: user.name, email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: '7d',
        }
    );
};
