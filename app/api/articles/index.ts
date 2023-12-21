// pages/api/articles.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb'; // MongoDB connection utility
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const { db } = await connectToDatabase();
  const articlesCollection = db.collection('articles'); // Replace 'articles' with your article collection name

  switch (method) {
    case 'GET':
      // Get all articles
      try {
        const articles = await articlesCollection.find({}).toArray();
        res.status(200).json(articles);
      } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'POST':
      // Create a new article
      try {
        const { title, content } = req.body;
        const newArticle = { title, content, status: 'pending' };
        const result = await articlesCollection.insertOne(newArticle);
        res.status(201).json({ message: 'Article created successfully', article: result.ops[0] });
      } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'PUT':
      // Update an existing article
      try {
        const { id, title, content } = req.body;
        const updatedArticle = { title, content };
        const result = await articlesCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updatedArticle },
          { returnDocument: 'after' }
        );

        if (!result.value) {
          return res.status(404).json({ error: 'Article not found' });
        }

        res.status(200).json({ message: 'Article updated successfully', article: result.value });
      } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'DELETE':
      // Delete an article
      try {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ error: 'Invalid request. Article id is required.' });
        }

        const result = await articlesCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Article not found' });
        }

        res.status(200).json({ message: 'Article deleted successfully' });
      } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    case 'PATCH':
      // Admin accepts or rejects an article
      try {
        const { id, status } = req.body;

        if (!id || !status) {
          return res.status(400).json({ error: 'Invalid request. Both id and status are required.' });
        }

        const updatedStatus = status === 'accept' ? 'accepted' : 'rejected';

        const result = await articlesCollection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { status: updatedStatus } },
          { returnDocument: 'after' }
        );

        if (!result.value) {
          return res.status(404).json({ error: 'Article not found' });
        }

        res.status(200).json({ message: `Article ${updatedStatus === 'accepted' ? 'accepted' : 'rejected'} successfully`, article: result.value });
      } catch (error) {
        console.error('MongoDB error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;

    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
