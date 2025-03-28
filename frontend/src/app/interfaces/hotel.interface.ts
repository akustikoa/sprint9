export interface Hotel {
    id_hotel: number;
    id_tour: number;
    nom_hotel: string;
    descripcio?: string;
    imatge_url?: string;
    enllac?: string;
    nits?: number;
}