import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email); // Verifica se existe um email válido criado no banco de dados

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // user.password : senha criptografada
        // password: senha não criptografada

        const passwordMatched = await this.hashProvider.compareHash(password, user.password); // Compara a senha criptografada com a senha não criptografada

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
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
