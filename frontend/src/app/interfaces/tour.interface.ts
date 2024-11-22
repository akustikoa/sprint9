import { Dia } from "./dia.interface";

export interface Tour {
    id_tour: number;
    nom_tour: string;
    imatge_tour: string;
    data_inici: string;
    data_final: string;
    password: string;
    days?: Dia[];
    users?: { email: String }[];
}