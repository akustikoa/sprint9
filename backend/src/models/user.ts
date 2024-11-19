import { DataTypes } from "sequelize";
import db from '../db/connection';

const User = db.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    id_tour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tours',
            key: 'id_tour'
        }
    }
}, {
    timestamps: false
});

export default User;