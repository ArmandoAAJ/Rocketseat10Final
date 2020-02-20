import * as Yup from 'yup';
import { parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class OrderEndController {
  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date().required(),
      order_id: Yup.number().required(),
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const { id } = req.params;
    const { end_date, order_id, signature_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({ ERRO: 'Entregador não encontrado.' });
    }

    const orders = await Order.findByPk(order_id);

    if (!orders) {
      return res.status(401).json({ ERRO: 'Verifique a entrega desejada.' });
    }

    const date = parseISO(end_date);
    zonedTimeToUtc(date, 'America/Sao_Paulo');

    const avatarIdExist = await File.findByPk(signature_id);

    if (!avatarIdExist && signature_id != null) {
      return res.status(401).json({ ERRO: 'Avatar Id não encontrado.' });
    }

    await orders.update({
      end_date: date,
      signature_id,
    });

    return res.json(orders);
  }
}

export default new OrderEndController();
