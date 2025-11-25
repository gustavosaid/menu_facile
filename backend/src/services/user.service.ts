import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { hash } from "bcryptjs";
import { prisma } from "..";

interface AuthRequest {
  email: string;
  password: string;
}

interface UserRequest {
  name: string;
  email: string;
  password: string;
}


export const authUserService = async ({ email, password }: AuthRequest) => {
  const user = await prisma.user.findFirst({
    where: { email: email }
  });

  if (!user) {
    throw new Error("Usuário ou senha incorretos");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Usuário ou senha incorretos");
  }

  const token = sign(
    {
      name: user.name,
      email: user.email
    },
    process.env.JWT_SECRET || "segredo-do-menu-facile", 
    {
      subject: user.id, 
      expiresIn: "30d"  
    }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token: token
  };
}

//Criando admin
export const createUserService = async ({ name, email, password }: UserRequest) => {
  
  if (!email) throw new Error("Email incorreto");

  const userAlreadyExists = await prisma.user.findFirst({
    where: { email: email }
  });

  if (userAlreadyExists) {
    throw new Error("Usuário já existe");
  }
  const passwordHash = await hash(password, 8);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
    }
  });

  return user;
}