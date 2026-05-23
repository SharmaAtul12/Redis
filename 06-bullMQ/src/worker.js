import {Worker} from 'bullmq';
import { connection } from './queue.js';

const worker = new Worker('emails', async (job) => {
  console.log(`Processing job ${job.id} with data:`, job.data);
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate a delay of 1.5 seconds
  console.log(`Email job Completed ${job.id}, Job name: ${job.name} with data:`, job.data );
}, { connection });

worker.on('completed', (job) => {
  console.log(`Job ${job.id} has been completed!`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} has failed with error:`, err);
});