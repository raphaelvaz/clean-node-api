import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: '',

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getConnection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },
  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
