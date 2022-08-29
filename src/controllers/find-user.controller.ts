import { Users } from '@prisma/client';
import { Request, Response } from 'express';

import { prismaClient } from '../prisma/client';

import { redis } from '../lib/cache';

export class FindUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const id: string = request.params.id as string;

    if (!id) {
      return response 
        .status(400)
        .json({
          status: 'Error',
          error: 'An user ID must be provided'
        });
    }

    const cachedUser: string = await redis.get(`user-${id}`); /* 1s */
    
    if (cachedUser) {
      return response.json({
        status: 'Success',
        body: JSON.parse(cachedUser)
      });
    }

    const prismaUser: Users = await prismaClient.users.findUnique({
      where: {
        id
      }
    }); /* 83s */

    if (!prismaUser) {
      return response
        .status(400)
        .json({
          status: 'Error',
          error: 'Non-existent user'
        });
    }

    await redis.set(`user-${id}`, JSON.stringify(prismaUser));

    return response.json({
      status: 'Success',
      body: prismaUser
    });
  }
}