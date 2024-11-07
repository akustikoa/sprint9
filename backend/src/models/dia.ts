import { DataTypes } from "sequelize";
import sequelize from '../db/connection';
import Tour from './tour';

const Dia = sequelize.define('Dia', {
    id_dia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numero_dia: DataTypes.INTEGER,
    titol_etapa: DataTypes.STRING,
    imatge_etapa: DataTypes.STRING,
    descripcio: DataTypes.TEXT,
    coordenades_inici: DataTypes.STRING,
    coordenades_final: DataTypes.STRING,
    coordenades_inici2: DataTypes.STRING,
    coordenades_final2: DataTypes.STRING,
    coordenades_inici3: DataTypes.STRING,
    coordenades_final3: DataTypes.STRING,
}, {
    tableName: 'dies',
    timestamps: false
});

Dia.belongsTo(Tour, { foreignKey: 'id_tour' });

export default Dia;