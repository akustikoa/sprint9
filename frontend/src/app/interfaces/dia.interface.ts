export interface Dia {
    id_dia: number;
    numero_dia: number;
    data_dia: string;
    titol_etapa: string;
    imatge_etapa: string;
    id_tour: number;
    descripcio: string;
    coordenades_inici: string;
    coordenades_inici2: string;
    coordenades_inici3: string;
    coordenades_final: string;
    coordenades_final2: string;
    coordenades_final3: string;
    reliveUrl?: string;
    elevationImage?: string;
}