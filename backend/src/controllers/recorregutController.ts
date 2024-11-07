import { Request, Response } from "express";
import Recorregut from "../models/recorregut";

// Obtenir els recorreguts d'un dia 
export const getRecorregutsByDia = async (req: Request, res: Response) => {
    const { diaId } = req.params;
    const recorreguts = await Recorregut.findAll({ where: { id_dia: diaId } });
    res.json(recorreguts);
};


//obternir un recorregur específic (etapa)
export const getRecorregut = async (req: Request, res: Response) => {
    const { id } = req.params;
    const recorregut = await Recorregut.findByPk(id);
    if (recorregut) {
        res.json(recorregut);
    } else {
        res.status(404).json({ msg: `No s'ha trobat el recorregut amb id ${id}` });
    }
};

//crear un nou recorregut per un dia 
export const createRecorregut = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const recorregut = await Recorregut.create(body);
        res.json(recorregut);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: `No s'ha pogut crear el recorregut` });
    }
};

//actualitzar recorregut
export const updateRecorregut = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const recorregut = await Recorregut.findByPk(id);
    if (recorregut) {
        await recorregut.update(body);
        res.json(recorregut);
    } else {
        res.status(400).json({ msg: `No s'ha pogut actualitzar el recorregut amb id ${id}` });
    }
};

//eliminar recorregut
export const deleteRecorregut = async (req: Request, res: Response) => {
    const { id } = req.params;
    const recorregut = await Recorregut.findByPk(id);
    if (recorregut) {
        await recorregut.destroy();
        res.json({ msg: `S'ha eliminat el recorregut amb id ${id}` });
    } else {
        res.status(404).json({ msg: `No s'ha trobat el recorregut amb id ${id}` });
    }
};