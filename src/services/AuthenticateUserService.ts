import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/Users';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } }); // Verifica se existe um email válido criado no banco de dados

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        // user.password : senha criptografada
        // password: senha não criptografada

        const passwordMatched = await compare(password, user.password); // Compara a senha criptografada com a senha não criptografada

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        // Usuário autenticado

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;