import { DataTypes } from "sequelize";
import sequelize from "../config/db.config";

const Tour = sequelize.define('Tour', {
    id_tour: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_tour: DataTypes.STRING,
    imatge_tour: DataTypes.STRING,
    data_inici: DataTypes.DATE,
    data_final: DataTypes.DATE,
});

export default Tour;