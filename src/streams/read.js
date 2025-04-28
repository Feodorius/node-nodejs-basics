import { createReadStream } from 'fs';
import path from 'path';
import { stdout } from 'process';
import { fileURLToPath } from 'url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

    const stream = createReadStream(filePath);
    stream.pipe(stdout);

    stream.on('end', () => {
        console.log('\nStream reading finished.');
    });
    stream.on('error', (err) => {
        console.error('Error:', err.message);
    });
};

await read();