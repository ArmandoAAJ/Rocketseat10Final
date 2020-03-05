import { Model, Sequelize } from 'sequelize';

class Problem extends Model {
  static init(sequelize) {
    super.init(
      {
        order_id: Sequelize.INTEGER,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, {
      foreignKey: 'order_id',
      as: 'order',
    });
  }
}

export default Problem;
