import { Request, Response } from 'express';

import { Prisma, Users } from '@prisma/client';
import { prismaClient } from '../prisma/client';

export class CreateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { name, email }: Prisma.UsersCreateInput = request.body;

    const userAlreadyExists: Users = await prismaClient.users.findUnique({
      where: {
        email
      }
    });

    if (userAlreadyExists) {
      return response
        .status(400)
        .json({
          status: 'Error',
          error: 'User already exists'
        });
    }

    await prismaClient.users.create({
      data: {
        name,
        email
      }
    });

    return response.json({
      status: 'Success',
      message: 'User created successfully'
    });
  }
}