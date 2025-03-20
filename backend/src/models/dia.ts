import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Tour from './tour';

class Dia extends Model {
    public id_dia!: number;
    public numero_dia!: number;
    public data_dia!: string;
    public titol_etapa!: string;
    public imatge_etapa!: string;
    public descripcio!: string;
    public coordenades_inici!: string;
    public coordenades_final!: string;
    public id_tour!: number;
}

Dia.init(
    {
        id_dia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numero_dia: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data_dia: DataTypes.STRING,
        titol_etapa: DataTypes.STRING,
        imatge_etapa: DataTypes.STRING,
        descripcio: DataTypes.TEXT,
        coordenades_inici: DataTypes.STRING,
        coordenades_final: DataTypes.STRING,
        id_tour: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'days',
        timestamps: false,
    }
);

export default Dia;



