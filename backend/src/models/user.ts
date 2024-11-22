import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

class User extends Model {
    public id_user!: number;
    public email!: string;
    public id_tour!: number;
}

User.init(
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        id_tour: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'users',
        timestamps: false,
    }
);

export default User;

