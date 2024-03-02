import models from '../models';

export default {
  getAllUsers: async (req, res) => {
    try {
      console.log('obteniendo usuarios.........')
      console.log( models.User )
      const users = await models.User.findAll();
      console.log(users)
      res.json(users);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  }
}