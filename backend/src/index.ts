// Servidor Express
import express from 'express';
import sequelize from './config/db.config';
import Tour from './models/tour';
import Dia from './models/dia';
import Recorregut from './models/recorregut';

const app = express(); // inicialitzem l'app
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API de Bikecat funcionant');
});

sequelize.sync().then(() => {
    console.log('Database sincronitzada');
}).catch((err) => {
    console.error('Error sincrontizant DB', err);
});

app.listen(PORT, () => {
    console.log(`Servidor funcinant al port  ${PORT}`);
});
