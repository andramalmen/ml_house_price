import fs from 'fs';
import logger from './logger';

const dir = __dirname + '/../../csv/';

const serveCSV = async () => {
    try {
        const data = await fs.readFileSync(dir + 'house.csv', 'utf8');
        return data;
    } catch (error) {
        logger.error(error);
        return '';
    }
};

export default serveCSV;
