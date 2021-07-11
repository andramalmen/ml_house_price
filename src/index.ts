import start from './start';

try {
    start();
} catch (err) {
    console.error(`Error starting server: ${err.message}`);
    process.exit(-1);
}
