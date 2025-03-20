import { DataTypes, Model } from "sequelize";
import db from '../db/connection';
import Tour from './tour';

class Hotel extends Model {
    public id_hotel!: number;
    public id_tour!: number;
    public nom_hotel!: string;
    public descripcio?: string;
    public imatge_url?: string;
    public enllac?: string;
    public nits?: number;
}

Hotel.init(
    {
        id_hotel: {
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
        nom_hotel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        imatge_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        enllac: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nits: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        tableName: 'hotels',
        timestamps: false,
    }
);

export default Hotel
