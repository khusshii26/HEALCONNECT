import bcrypt from 'bcryptjs';
import { clientPromise } from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const client = await clientPromise;
      const db = client.db('healconnectdb');  // replace with your DB name
      const usersCollection = db.collection('users');

      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
      }

      await usersCollection.insertOne({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
