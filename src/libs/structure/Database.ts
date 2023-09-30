import mongoose from 'mongoose';
import DiscordClient from './DiscordClient';

export default class Database {
  public readonly client: DiscordClient;

  constructor(client: DiscordClient) {
    this.client = client;
    this.connect();
  }

  private connect() {
    mongoose
      .connect(this.client.config.MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      } as mongoose.ConnectOptions)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.log(err));
  }

  public async getStatus() {
    return mongoose.connection.readyState;
  }
}
