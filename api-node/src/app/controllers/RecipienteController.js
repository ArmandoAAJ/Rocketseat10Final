// Cadastro Receptores/Clientes dos produtos
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }
    const { name, rua, numero, estado, complemento, cidade, cep } = req.body;

    const estadoUpper = estado.toUpperCase();

    const recipient = await Recipient.create({
      name,
      rua,
      numero,
      complemento,
      estado: estadoUpper,
      cidade,
      cep,
      active: true,
    });

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.string(),
      complemento: Yup.string(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const { id } = req.params;

    const { name, rua, numero, estado, complemento, cidade, cep } = req.body;

    const estadoUpper = estado.toUpperCase();

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ ERRO: 'Receptor não encontrado.' });
    }

    await recipient.update({
      name,
      rua,
      numero,
      complemento,
      estado: estadoUpper,
      cidade,
      cep,
      active: true,
    });

    return res.json(recipient);
  }

  async index(req, res) {
    const { q, page = 1 } = req.query;

    const recipient = q
      ? await Recipient.findAndCountAll({
          where: { name: { [Op.iLike]: `%${q}%` }, active: true },
          order: ['id'],
          limit: 5,
          offset: (page - 1) * 5,
        })
      : await Recipient.findAndCountAll({
          where: { active: true },
          order: ['id'],
          limit: 5,
          offset: (page - 1) * 5,
        });

    if (recipient.length <= 0) {
      return res.json({ ERRO: 'Não há Destinatário cadastrado!' });
    }

    return res.json(recipient);
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ ERRO: 'Recipient não encontrado' });
    }

    await recipient.update({ active: false });

    return res.json(recipient);
  }
}

export default new SessionController();
