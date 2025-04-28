import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceFilePath = path.join(__dirname, 'files', 'archive.gz');
    const destinationFilePath = path.join(__dirname, 'files', 'fileToCompress.txt'); 

    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(destinationFilePath);
    const gunzipStream = createGunzip();
    readStream.pipe(gunzipStream).pipe(writeStream);
};

await decompress();