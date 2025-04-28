import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { Worker } from "worker_threads";

const performCalculations = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, "Worker.js");

    const numCPUs = os.cpus().length;
    const workers = [];

    for (let i = 0; i < numCPUs; i++) {
        const worker = new Worker(filePath, { type: 'module' });
        const numberToSend = 10 + i;

        const workerPromise = new Promise((resolve) => {
            worker.on('message', (message) => {
                resolve({ status: message.status, data: message.data });
            });

            worker.on('error', (error) => {
                resolve({ status: 'error', data: error.message });
            });

            worker.postMessage(numberToSend);
        });
        workers.push(workerPromise);

    }
    const result = await Promise.all(workers);
    console.log(result);

    process.exit(0);
};

await performCalculations();