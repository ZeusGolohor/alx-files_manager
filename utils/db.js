const { MongoClient } = require('mongodb');

/**
 * A mangoDB class.
 */
class DBClient {
  /**
   * DBClient class constructor
   */
  constructor () {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${this.host}:${this.port}/${this.database}`;
    const client = new MongoClient(url);
  }

  /**
   * A method to check if the database is connected.
   */
  isAlive() {

  }
}

const dbClient = new DBClient();
export default dbClient;
