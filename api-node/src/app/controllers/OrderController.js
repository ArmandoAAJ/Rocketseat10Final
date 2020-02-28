// Cadastro dados da entrega/cliente/entregador/produto
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const deliveriman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveriman) {
      return res.status(401).json({ ERRO: 'Entregador não encontrado.' });
    }

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(401).json({ ERRO: 'Receptor/Cliente não encontrado.' });
    }

    const order = await Order.create(req.body);

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const { id } = req.params;
    const { recipient_id, deliveryman_id } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({
        ERRO: 'Não encontramos nenhuma entrega com os dados fornecidos',
      });
    }

    const deliveriman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveriman) {
      return res.status(401).json({ ERRO: 'Entregador não encontrado.' });
    }

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(401).json({ ERRO: 'Receptor/Cliente não encontrado.' });
    }

    await order.update(req.body);

    return res.json(order);
  }

  async index(req, res) {
    const order = await Order.findAll({
      order: ['id'],
    });

    if (order < 1) {
      return res.status(401).json({ ERRO: 'Não há Deliveryman cadastrados' });
    }

    return res.json(order);
  }

  async show(req, res) {
    const { q, page = 1 } = req.query;

    const orders = q
      ? await Order.findAll({
          where: { product: { [Op.iLike]: `%${q}%` } },
          order: ['product'],
          limit: 10,
          offset: (page - 1) * 10,
        })
      : await Order.findAll({
          order: ['product'],
          limit: 10,
          offset: (page - 1) * 10,
        });

    if (orders.length <= 0) {
      return res.json({ error: 'Não encontramos nada com sua busca!' });
    }

    return res.json(orders);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({ ERRO: 'Entrega não encontrada' });
    }

    await order.destroy();

    return res.json(order);
  }
}

export default new OrderController();