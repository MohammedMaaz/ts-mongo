import { Db, Document, MongoClient } from 'mongodb'
import { mkTsCollection, TsCollection } from '../src'

let client: MongoClient | null = null
let cached: boolean = false

export const setupDb = async (): Promise<Db> => {
  if (!cached || !client) {
    client = new MongoClient(process.env.MONGO_URL ?? '')
    await client.connect()
    cached = true
  }

  return client.db() as Db
}

export const mkTsTestCollection = async <TSchema extends Document>(): Promise<
  TsCollection<TSchema>
> => {
  const db = await setupDb()
  return mkTsCollection<TSchema>(db, Math.random().toString())
}
