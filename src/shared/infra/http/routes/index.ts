import { Router } from 'express';

import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'; // Importando a rota de appointments
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/profile', profileRouter);
routes.use('/appointments', appointmentsRouter); // Independente do método que for usado, ele vai sempre apontar para appointments
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/providers', providersRouter);

export default routes;
