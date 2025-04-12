import mongoose from 'mongoose';

export const connected = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to MongoDB');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URL, { 
        dbName:"horizon",
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Could not connect to the database');
  }
};
