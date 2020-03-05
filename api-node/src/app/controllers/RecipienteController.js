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
    const { name, rua, numero, complemento, estado, cidade, cep } = req.body;
    const recipient = await Recipient.create({
      name,
      rua,
      numero,
      complemento,
      estado,
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

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(401).json({ ERRO: 'Receptor não encontrado.' });
    }

    await recipient.update(req.body);

    return res.json(recipient);
  }

  async index(req, res) {
    const { q, page = 1 } = req.query;

    const recipient = q
      ? await Recipient.findAll({
          where: { name: { [Op.iLike]: `%${q}%` }, active: true },
          order: ['name'],
          offset: (page - 1) * 10,
        })
      : await Recipient.findAll({
          where: { active: true },
          order: ['name'],
          offset: (page - 1) * 10,
        });

    if (recipient.length <= 0) {
      return res.json({ error: 'Não encontramos nada com sua busca!' });
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
