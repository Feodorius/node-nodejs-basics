import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    const writableStream = createWriteStream(filePath, { encoding: 'utf8' });
    process.stdin.pipe(writableStream);

    writableStream.on('error', (err) => {
        console.error('Error writing to file:', err.message);
    });
};

await write();