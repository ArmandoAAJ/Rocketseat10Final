// Cadastro entregadores dos produtos
import * as Yup from 'yup';
import { parseISO, startOfDay, endOfDay, isBefore, getHours } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Op } from 'sequelize';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';

class OrderStartController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      order_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const { id } = req.params;
    const { start_date, order_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({ ERRO: 'Entregador não encontrado.' });
    }

    const orders = await Order.findByPk(order_id);

    if (!orders) {
      return res.status(401).json({ ERRO: 'Verifique a entrega desejada.' });
    }

    const newDate = new Date();
    zonedTimeToUtc(newDate, 'America/Sao_Paulo');

    const date = parseISO(start_date);
    zonedTimeToUtc(date, 'America/Sao_Paulo');

    if (!isBefore(newDate, date)) {
      return res.status(401).json({ ERRO: 'Data Inválida.' });
    }

    const dateStart = startOfDay(date);
    const dateEnd = endOfDay(date);

    const formatHour = getHours(date);

    if (formatHour >= '18' || formatHour < '08') {
      return res.status(401).json({ ERRO: 'Horário Inválido.' });
    }

    const ordersCount = await Order.findAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [dateStart, dateEnd],
        },
      },
    });

    if (ordersCount.length >= 5) {
      return res
        .status(401)
        .json({ ERRO: 'Só é permitido 5 agendamentos por dia.' });
    }

    await orders.update({
      start_date: date,
    });

    return res.json(orders);
  }
}

export default new OrderStartController();
