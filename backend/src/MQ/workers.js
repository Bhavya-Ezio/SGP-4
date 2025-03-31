import { Worker } from 'bullmq';
import { connection } from './redisConfig.js';
import audioSchema from '../schema/audio.schema.js';

const myWorker = new Worker(
    'transcription',
    async (job) => {
        console.log(`Processing job ${job.id}:`, job.data);
        // Add your job processing logic here
        await audioSchema.updateOne({ _id: job.data.id }, { $set: { progress: "processing" } });
        await new Promise(resolve => setTimeout(resolve, 40000));
    },
    { connection }
);

myWorker.on('completed', async (job) => {
    await audioSchema.updateOne({ _id: job.data.id }, { $set: { progress: "completed" } });
    console.log(`Job ${job.id} completed!`);
});

myWorker.on('failed', async (job, err) => {
    await audioSchema.updateOne({ _id: job.data.id }, { $set: { progress: "error" } });
    console.log(`Job ${job.id} failed with error: ${err.message}`);
});

export default myWorker;
