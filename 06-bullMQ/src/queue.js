import {Queue} from 'bullmq';

// Redis Connection
const connection = {
  host: 'localhost',
  port: 6379,
}

const emailQueue = new Queue('emails', { connection });

export { emailQueue , connection };