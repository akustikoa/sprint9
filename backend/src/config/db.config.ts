//configurem la conexió amb la BD
import { Sequelize } from 'sequelize';

const sequilize = new Sequelize('bikecat', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

export default sequilize;