import { Router } from 'express';

import appointmentsRouter from './appointments.routes'; // Importando a rota de appointments
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter); // Independente do método que for usado, ele vai sempre apontar para appointments
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
