"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointments_routes_1 = __importDefault(require("./appointments.routes")); // Importando a rota de appointments
var routes = express_1.Router();
routes.use('/appointments', appointments_routes_1.default); // Independente do método que for usado, ele vai sempre apontar para appointments
exports.default = routes;
