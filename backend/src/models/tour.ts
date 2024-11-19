import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

const Tour = db.define('Tour', {
    id_tour: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_tour: { type: DataTypes.STRING },
    imatge_tour: { type: DataTypes.STRING },
    data_inici: { type: DataTypes.DATE },
    data_final: { type: DataTypes.DATE },
    password: { type: DataTypes.STRING }
}, {
    timestamps: false
});

export default Tour;


