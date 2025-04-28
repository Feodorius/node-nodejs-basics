import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    const hash = createHash('sha256');

    const stream = createReadStream(filePath);

    stream.on('data', (chunk) => hash.update(chunk));

    stream.on('end', () => {
        const hexHash = hash.digest('hex');
        console.log(hexHash);
    });

    stream.on('error', (err) => {
        console.error('Error:', err.message);
    });
};

await calculateHash();