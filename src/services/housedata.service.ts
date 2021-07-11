import { GET, Path } from 'typescript-rest';
import mergeData from '../utils/mergeData';
import saveData from '../utils/saveData';
import saveCSV from '../utils/saveCSV';

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
}

export default HouseDataService;
