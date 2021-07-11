import { GET, Path } from 'typescript-rest';
import mergeData from '../utils/mergeData';
import saveCSV from '../utils/saveCSV';
import saveData from '../utils/saveData';
import serveCSV from '../utils/serveCSV';

@Path('/v0/housedata')
class HouseDataService {
    @GET
    @Path('/mergedata')
    public async mergeData(): Promise<boolean> {
        await mergeData();
        return true;
    }

    @GET
    @Path('/saveData')
    public async saveData(): Promise<boolean> {
        await saveData();
        return true;
    }

    @GET
    @Path('/saveCSV')
    public async saveCSV(): Promise<boolean> {
        await saveCSV();
        return true;
    }

    @GET
    @Path('/serveCSV')
    public async serveCSV() {
        const csv = await serveCSV();
        return csv;
    }
}

export default HouseDataService;
