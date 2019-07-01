import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' });
    }

    // atribuicao de dados vindo da requisicao
    const { email, password } = req.body;

    // Buscar apenas 1 email
    const user = await User.findOne({ where: { email } });

    // Usuario nao encontrado
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Senha nao confere
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;
    // retornar dados do usuario
    return res.json({
      user: {
        id,
        name,
        email
      },
      // enviar objecto payload(informacoes adicionais) com valor unico no universo
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
