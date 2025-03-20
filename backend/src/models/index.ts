import db from '../db/connection';
import User from './user';
import Tour from './tour';
import Dia from './dia';
import Hotel from './hotel';
import Location from './location'

// Defineix les relacions
Tour.hasMany(Dia, { foreignKey: 'id_tour', as: 'days' });
Tour.hasMany(User, { foreignKey: 'id_tour', as: 'users' });
Tour.hasMany(Hotel, { foreignKey: 'id_tour', as: 'hotels' });
Tour.hasMany(Location, { foreignKey: 'id_tour', as: 'locations' });

Dia.belongsTo(Tour, { foreignKey: 'id_tour', as: 'tour' });
User.belongsTo(Tour, { foreignKey: 'id_tour', as: 'tour' });
Hotel.belongsTo(Tour, { foreignKey: 'id_tour' });
Location.belongsTo(Tour, { foreignKey: 'id_tour' });

export { db, Dia, User, Tour, Hotel, Location };
