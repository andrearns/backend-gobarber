import { Router } from 'express';
import appointmentsRouter from './appointments.routes'; // Importando a rota de appointments

const routes = Router();

routes.use('/appointments', appointmentsRouter); // Independente do método que for usado, ele vai sempre apontar para appointments

export default routes;