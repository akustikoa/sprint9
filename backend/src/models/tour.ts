import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class Tour extends Model {
    public id_tour!: number;
    public nom_tour!: string;
    public imatge_tour!: string;
    public data_inici!: Date;
    public data_final!: Date;
    public password!: string;
}

Tour.init(
    {
        id_tour: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom_tour: { type: DataTypes.STRING },
        imatge_tour: { type: DataTypes.STRING },
        data_inici: { type: DataTypes.STRING },
        data_final: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
    },
    {
        sequelize: db,
        tableName: 'tours',
        timestamps: false,
    }
);

export default Tour;








