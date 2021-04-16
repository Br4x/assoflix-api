import { ShowSchemaModel } from './model';
import { logger } from '../../../core/logger/index';

export const addShow = async ({ ...rest }: any) => {
    try {
        const show: any = await ShowSchemaModel.create({ ...rest });
        return show;
    } catch (error) {
        logger.error(`Error on signup: ${error.message}`);
        throw error;
    }
};
export const byGenre = async ({ genre }: any) => {
    try {
        const shows: any = await ShowSchemaModel.find({ 'details.genres': { $in: [genre] } }).limit(10);
        return shows;
    } catch (error) {
        logger.error(`Error on genre: ${error.message}`);
        throw error;
    }
};
export const categories = async () => {
    const genres = [
        'Communication',
        'Administratif',
        'Légal / Juridique',
        'Gouvernance',
        'Projets',
        'Partenariats',
        'Outils',
        'Financement',
        'Numérique',
        'Témoignages',
        'Histoire',
        'Communauté',
        'Formation',
        'Tendances',
        'Sport',
        'Art et culture',
        'Education & jeunesse',
        'Humanitaire & solidaire',
        'Environnement & biodiversité',
        'Loisirs & arts',
        'Santé',
        'Défense des droits & social',
        'Recherche & science'
    ];
    try {
        const shows: any = await Promise.all(
            genres.map((genre) => ShowSchemaModel.find({ 'details.genres': { $in: [genre] } }).limit(5))
        );
        return genres.map((genre, i) => ({ title: genre, items: shows[i] }));
    } catch (error) {
        logger.error(`Error on genre: ${error.message}`);
        throw error;
    }
};
export const shuffle = async () => {
    try {
        const count: number = await ShowSchemaModel.count();
        const random = Math.floor(Math.random() * count);
        const show: any = await ShowSchemaModel.findOne().skip(random);
        return show;
    } catch (error) {
        logger.error(`Error on random: ${error.message}`);
        throw error;
    }
};
export const byId = async ({ id }: any) => {
    try {
        return await ShowSchemaModel.findOne({ id });
    } catch (error) {
        logger.error(`Error on random: ${error.message}`);
        throw error;
    }
};