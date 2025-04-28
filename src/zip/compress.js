import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destinationFilePath = path.join(__dirname, 'files', 'archive.gz');
    
    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(destinationFilePath);

    const gzipStream = createGzip();
    readStream.pipe(gzipStream).pipe(writeStream);
};

await compress();