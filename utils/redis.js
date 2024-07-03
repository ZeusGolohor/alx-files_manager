import { createClient } from 'redis'

/**
 * A redis client class.
 */
class RedisClient {
  /**
   * Redis class constructor
   */
  constructor () {
    this.client = createClient()
    this.isClientConnected = true

    this.client.on('error', (err) => {
      console.error('Redis client failed to connect:', err.message || err.toString())
      this.isClientConnected = false
    })
  }

  /**
   * A method to check if redis is connected.
   */
  isAlive () {
    return this.isClientConnected
  }

  /**
   * A method used to retrieve a key from redis.
   */
  async get (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  /**
   * A method to set a value for a key in redis.
   */
  async set (key, value, exp) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', exp, (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  /**
   * A method used to delete a key and value from redis.
   */
  async del (key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(reply === 1)
        }
      })
    })
  }
}

const redisClient = new RedisClient()
export default redisClient
