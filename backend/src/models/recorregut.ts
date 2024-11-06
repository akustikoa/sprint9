import { DataTypes } from "sequelize";
import sequilize from "../db/connection";
import Dia from './dia';

const Recorregut = sequilize.define('Recorregut', {
    id_recorregut: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_recorregut: DataTypes.STRING,
    color: DataTypes.STRING,
    coordenades: DataTypes.JSON,
});

Recorregut.belongsTo(Dia, { foreignKey: 'id_dia' });

export default Recorregut; 