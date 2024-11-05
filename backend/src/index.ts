// Servidor Express
import express from 'express';
import sequelize from './config/db.config';
import Tour from './models/tour';
import Dia from './models/dia';
import Recorregut from './models/recorregut';

const app = express(); // inicialitzem l'app
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.send('API de Bikecat funcionant');
});

sequelize.sync().then(() => {
    console.log('Database sincronitzada');
}).catch((err) => {
    console.error('Error sincrontizant DB', err);
});

app.listen(PORT, () => {
    console.log(`Servidor funcionant al port  ${PORT}`);
});
console.log(`Servidor intentant escoltar al port ${PORT}`);
console.log(`Configuració de la DB: ${process.env.DB_NAME}`);
