
import { MongoClient } from 'mongodb';

const uri = 'your-mongodb-connection-string'; 
const client = new MongoClient("mongodb+srv://<Amr>:<El-Desoky>@<articles>/test?retryWrites=true&w=majority",);

export async function connectToDatabase() {
  const db = client.db('articles'); 
  return { db, client };
}
