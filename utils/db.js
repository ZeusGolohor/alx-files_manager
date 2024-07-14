const { MongoClient } = require('mongodb');

/**
 * A mangoDB class.
 */
class DBClient {
  /**
   * DBClient class constructor
   */
  constructor () {
    const HOST = process.env.DB_HOST || 'localhost';
    const PORT = process.env.DB_PORT || 27017;
    const DATABASE = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${HOST}:${PORT}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${DATABASE}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * A method to check if the database is connected.
   */
  isAlive() {
    return this.client.isConnected();
  }
}

const dbClient = new DBClient();
export default dbClient;
