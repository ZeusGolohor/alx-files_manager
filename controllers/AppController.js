import redisClient from "../utils/redis";
import dbClient from "../utils/db";

class AppController {
  /**
   * Used to get information about redis.
   */
  static getStatus(request, response) {
    response
      .status(200)
      .json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  /**
   * Used to get information about mangodb
   */
  static async getStats(request, response) {
    const usersNumber = await dbClient.nbUsers();
    const filesNumber = await dbClient.nbFiles();
    response.status(200).json({ users: usersNumber, files: filesNumber });
  }
}
module.exports = AppController;
