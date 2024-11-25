import { Dia } from './dia.interface';
import { User } from './user.interface';

export interface TourPayload {
    tour: {
        nom_tour: string;
        imatge_tour: string;
        data_inici: string;
        data_final: string;
        password: string;
    };
    days: Dia[];
    users: User[];
}
