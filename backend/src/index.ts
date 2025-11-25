import { PrismaClient } from '@prisma/client';
import express, {Application, json} from "express";
import { routes } from "./routers";
import path from 'path';
import cors from "cors"; //Para efetuar a comunicacao back-end -> front_end

export const prisma: PrismaClient = new PrismaClient()
export const app: Application = express()


app.use(cors()); 
app.use(json())//informando o tipo de recebimento de dados

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'app', 'uploads')));

app.use(routes)

