import db from '../db/connection';
import User from './user';
import Tour from './tour';
import Dia from './dia';

// Defineix les relacions
Tour.hasMany(Dia, { foreignKey: 'id_tour', as: 'days' });
Tour.hasMany(User, { foreignKey: 'id_tour', as: 'users' });

Dia.belongsTo(Tour, { foreignKey: 'id_tour', as: 'tour' });
User.belongsTo(Tour, { foreignKey: 'id_tour', as: 'tour' });

export { db, Dia, User, Tour };
