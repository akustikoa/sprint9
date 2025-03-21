import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Dia from './dia';
import User from './user';
import Hotel from './hotel';
import Location from './location';


class Tour extends Model {
    public id_tour!: number;
    public nom_tour!: string;
    public imatge_tour!: string;
    public data_inici!: string;
    public data_final!: string;
    public password!: string;

    //Associacions amb les taules 
    public days?: Dia[];
    public users?: User[];
    public hotels?: Hotel[];
    public locations?: Location[];
}

Tour.init(
    {
        id_tour: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom_tour: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imatge_tour: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_inici: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_final: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'tours',
        timestamps: false,
    }
);

export default Tour;










