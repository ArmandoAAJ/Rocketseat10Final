// Cadastro problemas na entrega
import * as Yup from 'yup';
import OrderProblem from '../models/OrderProblem';
import Order from '../models/Order';

class OrderProblemControler {
  async store(req, res) {
    const schema = Yup.object().shape({
      order_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ ERRO: 'Verifique os dados.' });
    }

    const { order_id } = req.body;

    const orders = await Order.findByPk(order_id);

    if (!orders) {
      return res.status(401).json({ ERRO: 'Verifique a entrega desejada.' });
    }

    const problem = await OrderProblem.create(req.body);

    return res.json(problem);
  }

  async index(req, res) {
    const { id } = req.params;

    const problem = await OrderProblem.findOne({
      where: {
        order_id: id,
      },
    });

    if (!problem) {
      return res.status(401).json({ ERRO: 'Encomenda não encontrada' });
    }

    return res.json(problem);
  }

  async show(req, res) {
    const problem = await OrderProblem.findAll();

    if (!problem) {
      return res.status(401).json({ ERRO: 'Não há encomenda com problema' });
    }

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await OrderProblem.findByPk(id);

    if (!problem) {
      return res.status(401).json({ ERRO: 'Não há entrega com problema' });
    }

    const orders = await Order.findOne({
      where: {
        id: problem.order_id,
      },
    });

    if (!orders) {
      return res.status(401).json({ ERRO: 'Não encontramos nenhuma entrega' });
    }

    if (orders.canceled_at != null) {
      return res.status(401).json({ ERRO: 'Já encontra-se cancelada' });
    }

    orders.canceled_at = new Date();
    await orders.save();

    return res.json(orders);
  }
}

export default new OrderProblemControler();
