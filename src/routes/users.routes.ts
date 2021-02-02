import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

//Rota: Receber a requisição, chamar outro arquivo, devoler uma resposta
const usersRouter = Router();

usersRouter.post('/', async (request , response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // delete user.password;

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updatead_at: user.updated_at,
    }


    return response.json(userWithoutPassword);
  } catch(err) {
    return response.status(400).json({error: err.message});
  }

  
});

usersRouter.patch('/avatar', async (request, response) => {
  return response.json({ ok : true });
});

export default usersRouter;