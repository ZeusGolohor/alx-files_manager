const { MongoClient } = require('mongodb');

/**
 * A mangoDB class.
 */
class DBClient {
  /**
   * DBClient class constructor
   */
  constructor() {
    const HOST = process.env.DB_HOST || 'localhost';
    const PORT = process.env.DB_PORT || 27017;
    const DATABASE = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${HOST}:${PORT}`;

    this.client = new MongoClient(url);
    this.connected = false;

    try {
      // Connect asynchronously and store the promise
      this.connectPromise = this.client.connect();
      this.connectPromise
        .then(() => {
          this.db = this.client.db(DATABASE);
          this.connected = true;
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB:', error);
          this.connected = false;
        });
    } catch (error) {
      console.error('Error creating MongoClient:', error);
    }
  }

  /**
   * A method to check if the database is connected.
   */
  isAlive() {
    return this.connected;
  }

  /**
   * returns the number of documents in the collection users
   */
  async nbUsers() {
    if (!this.connected) {
      throw new Error('An error occured, Not connected to MongoDB database.');
    }
    try {
      const collection = this.db.collection('users');
      const count = await collection.countDocuments({});
      return count;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * returns the number of documents in the collection files
   */
  async nbFiles() {
    if (!this.connected) {
      throw new Error('An error occured, Not connected to MongoDB database.');
    }

    try {
      const collection = this.db.collection('files');
      const count = await collection.countDocuments({});
      return count;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
