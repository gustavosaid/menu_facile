import { Request, Response } from "express";
import { authUserService,createUserService } from "../services/user.service";

export const authUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const auth = await authUserService({ email, password });
    return res.json(auth);
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}

//Criando usuario
export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await createUserService({ name, email, password });
    return res.json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}