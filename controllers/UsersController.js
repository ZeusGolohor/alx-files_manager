import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UsersController {
  static async postNew(request, response) {
    const userEmail = request.body ? request.body.email : null;
    const userPassword = request.body ? request.body.password : null;

    if (!userEmail) {
      response.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!userPassword) {
      response.status(400).json({ error: 'Missing password' });
      return;
    }

    const existingUser = await (await dbClient.usersCollection()).findOne({email: userEmail});
    if (existingUser) {
      response.status(400).json({ error: 'Already exist' });
      return;
    }
    const insertionInfo = await (await dbClient.usersCollection())
      .insertOne({ email: userEmail, password: sha1(userPassword) });
    const userId = insertionInfo.insertedId.toString();
    userQueue.add({ userId });
    response.status(201).json({ email: userEmail, id: userId });
  }

  static async getMe(req, res) {
    const {user} = req;
    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}

