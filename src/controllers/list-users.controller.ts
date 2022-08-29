import { Request, Response } from 'express';

import { Users } from '@prisma/client';
import { prismaClient } from '../prisma/client';

import { redis } from '../lib/cache';

export class ListUsersController {
  static async handle(request: Request, response: Response): Promise<Response> {
    try {
      const cacheKey: string = 'users:all';
      const cachedUsers: string = await redis.get(cacheKey);

      if (cachedUsers) return response.json(JSON.parse(cachedUsers)); /* 18s */

      const prismaUsers: Users[] = await prismaClient.users.findMany(); /* 81s */

      await redis.set(cacheKey, JSON.stringify(prismaUsers));

      return response.json(prismaUsers);
    } catch (error) {
      console.log(error);

      return response
        .status(400)
        .json({
          error
        });
    }
  }
}