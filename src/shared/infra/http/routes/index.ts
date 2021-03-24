import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes'; // Importando a rota de appointments
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // Independente do método que for usado, ele vai sempre apontar para appointments
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
