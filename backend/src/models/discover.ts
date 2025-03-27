import { DataTypes, Model } from "sequelize";
import db from '../db/connection';
import Tour from './tour';

class Discover extends Model {
    public id_discover!: number;
    public id_tour!: number;
    public titol!: string;
    public descripcio!: string;
    public imatge_url?: string;
}

Discover.init(
    {
        id_discover: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_tour: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Tour,
                key: 'id_tour',
            },
        },
        titol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcio: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imatge_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        tableName: 'discovers',
        timestamps: false,
    }
);

export default Discover;
