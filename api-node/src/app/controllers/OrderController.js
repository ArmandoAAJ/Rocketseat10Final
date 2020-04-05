// Cadastro dados da entrega/cliente/entregador/produto
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

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
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const { id } = req.params;
    const { recipient_id, deliveryman_id, product } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({
        ERRO: 'Não encontramos nenhuma entrega com os dados fornecidos',
      });
    }

    if (
      order.recipient_id === recipient_id &&
      order.deliveryman_id === deliveryman_id &&
      order.product === product
    ) {
      return res.status(401).json({
        ERRO: 'Altera alguma opção para salvar',
      });
    }

    if (order.canceled_at) {
      return res.status(401).json({
        ERRO: 'Encomendas canceladas não podem ser alteradas',
      });
    }

    if (order.end_date) {
      return res.status(401).json({
        ERRO: 'Encomendas entregues não podem ser alteradas',
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
    const { q, page = 1 } = req.query;

    const orders = q
      ? await Order.findAndCountAll({
          where: { product: { [Op.iLike]: `%${q}%` } },
          order: ['id'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name', 'cidade', 'estado'],
            },
            {
              model: File,
              as: 'signature',
            },
          ],
          limit: 5,
          offset: (page - 1) * 5,
        })
      : await Order.findAndCountAll({
          order: ['id'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: ['id', 'name', 'cidade', 'estado', 'rua', 'cep'],
            },
            {
              model: File,
              as: 'signature',
            },
          ],
          limit: 5,
          offset: (page - 1) * 5,
        });

    if (orders.length < 1) {
      return res.json({ ERROR: 'Não encontramos nada com sua busca!' });
    }

    return res.json(orders);
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(401).json({ ERRO: 'Entrega não encontrada' });
    }

    if (order.end_date) {
      return res
        .status(401)
        .json({ ERRO: 'Entregas concluídas não podem ser excluídas' });
    }

    await order.destroy();

    return res.json(order);
  }
}

export default new OrderController();
