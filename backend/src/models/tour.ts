import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Tour = db.define('Tour', {
    nom_tour: { type: DataTypes.STRING },
    imatge_tour: { type: DataTypes.STRING },
    data_inici: { type: DataTypes.DATE },
    data_final: { type: DataTypes.DATE }
}, {
    timestamps: false
});

export default Tour;
