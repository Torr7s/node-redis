import express from 'express';

import { CreateUserController } from './controllers/create-user.controller';
import { FindUserController } from './controllers/find-user.controller';
import { ListUsersController } from './controllers/list-users.controller';

const app = express();

app.use(express.json());

app.post('/api/users', CreateUserController.handle);
app.get('/api/users', ListUsersController.handle)
app.get('/api/users/:id', FindUserController.handle)

export default app;