import { Queue } from 'bullmq';
import { connection } from './redisConfig.js';

const myQueue = new Queue('transcription', { connection });

const addJobToQueue = async (jobName, data, options = {}) => {
  await myQueue.add(jobName, data, options);
};

export { myQueue, addJobToQueue };
