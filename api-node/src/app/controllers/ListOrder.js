// Listagem de pedidos de entregas
import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class ListOrder {
  async index(req, res) {
    const { id } = req.params;

    const deliveriman = await Deliveryman.findByPk(id);

    if (!deliveriman) {
      return res.status(401).json({
        ERRO: 'Entregador não cadastrado, confira os dados fornecidos',
      });
    }

    const order = await Order.findAll({
      where: { deliveryman_id: id, canceled_at: null, end_date: null },
      order: ['id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'rua',
            'numero',
            'complemento',
            'estado',
            'cidade',
            'cep',
          ],
        },
      ],
    });

    if (order.length < 1) {
      return res.status(401).json({ ERRO: 'Não há entregas disponíveis' });
    }

    return res.json(order);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveriman = await Deliveryman.findByPk(id);

    if (!deliveriman) {
      return res.status(401).json({
        ERRO: 'Entregador não cadastrado, confira os dados fornecidos',
      });
    }

    const order = await Order.findAll({
      where: {
        deliveryman_id: id,
        end_date: {
          [Op.ne]: null,
        },
      },
    });

    if (order < 1) {
      return res.status(401).json({
        ERRO: 'Você não completou nenhuma entrega!',
      });
    }

    return res.json(order);
  }
}

export default new ListOrder();
