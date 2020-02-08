import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const deliverymanExist = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExist) {
      return res
        .status(401)
        .json({ ERRO: 'Já existe um deliveryman com esse E-MAIL.' });
    }

    const avatarIdExist = await File.findByPk(req.body.avatar_id);

    if (!avatarIdExist && req.body.avatar_id != null) {
      return res.status(401).json({ ERRO: 'Avatar Id não encontrado.' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const { email, avatar_id } = req.body;
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({ ERRO: 'Deliveryman não encontrado.' });
    }

    if (email !== deliveryman.email) {
      const deliverymanExist = await Deliveryman.findOne({
        where: { email },
      });

      if (deliverymanExist) {
        return res
          .status(401)
          .json({ ERRO: 'Já existe um deliveryman com esse E-MAIL.' });
      }
    }

    const avatarIdExist = await File.findByPk(avatar_id);

    if (!avatarIdExist && avatar_id != null) {
      return res.status(401).json({ ERRO: 'Avatar Id não encontrado.' });
    }

    const { name, avatar_id: avatarId } = await deliveryman.update(req.body);

    return res.json({ name, email, avatar_id: avatarId });
  }

  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      order: ['name'],
    });

    if (!deliveryman) {
      return res.status(401).json({ ERRO: 'Não há Deliveryman cadastrados' });
    }

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({ ERRO: 'Deliveryman não encontrado' });
    }

    await deliveryman.destroy();

    return res.json(deliveryman);
  }
}

export default new DeliverymanController();