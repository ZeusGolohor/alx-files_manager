import { createClient } from 'redis';

class RedisClient {
  constructor() {
    const client = await createClient()
        .on('error', err => console.log(err))
        .connect();
  }

  isAlive() {
    
  }
}
