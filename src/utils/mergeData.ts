import fs from 'fs';
const dir = __dirname + '/../../data/';

const getFiles = async () => {
    try {
        return await fs.readdirSync(dir);
    } catch (err) {
        console.log(err);
    }
};

const mergeData = async () => {
    const files = (await getFiles()) ?? [];
    let newJson: any = [];
    for (const file of files) {
        const json = await import(dir + file);
        newJson = newJson.concat(json.default);
    }

    fs.writeFile(dir + 'final.json', JSON.stringify(newJson), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Success');
    });
};

export default mergeData;
