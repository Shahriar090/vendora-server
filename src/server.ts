import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
const PORT = config.port || 7000;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log('✅ Database Connected Successfully');

    app.listen(PORT, () => {
      console.log(
        `🚀 Vendora Server Is Listening On Port => http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error('❌ Failed To Connected With Database', error);
    process.exit(1);
  }
}

main();
