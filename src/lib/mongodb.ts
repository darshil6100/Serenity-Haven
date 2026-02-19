import { MongoClient, Db } from 'mongodb';

let cachedDb: Db | null = null;
let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return { db: cachedDb, client: cachedClient };
  }

  const mongoUrl = import.meta.env.VITE_MONGODB_URI;
  if (!mongoUrl) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  const client = new MongoClient(mongoUrl);
  await client.connect();

  const db = client.db(import.meta.env.VITE_MONGODB_DB_NAME || 'serenity_haven');

  cachedClient = client;
  cachedDb = db;

  return { db, client };
}

export async function saveQueryToDatabase(queryData: {
  name: string;
  email: string;
  phone: string;
  package_interest: string;
  message: string;
}) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('queries');

    const result = await collection.insertOne({
      ...queryData,
      createdAt: new Date(),
      status: 'new'
    });

    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to save query to database');
  }
}
