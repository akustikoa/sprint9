import { DataTypes, Model } from "sequelize";
import db from '../db/connection';
import Tour from './tour';

class Location extends Model {
    public id_location!: number;
    public id_tour!: number;
    public nom_location!: string;
    public descripcio?: string;
    public imatge_url?: string;
}

Location.init(
    {
        id_location: {
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
        nom_location: {
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
    },
    {
        sequelize: db,
        tableName: 'locations',
        timestamps: false,


    }
);

export default Location