const mongoose = require('mongoose');

require('dotenv').config();



async function fixPaymentIndex() {
   try {
      // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
     console.log('✅ Connected to MongoDB');

    const collection = mongoose.connection.db.collection('payments');
    
      // Get all indexes
    const indexes = await collection.indexes();
     console.log('Current indexes:', indexes.map(idx => idx.name));

    // Drop existing transactionId index if it exists
     try {
        await collection.dropIndex('transactionId_1');
      console.log('✅ Dropped existing transactionId_1 index');
     } catch (error) {
        if (error.code === 27) {
        console.log('ℹ️  transactionId_1 index does not exist, skipping drop');
       } else {
          throw error;
      }
     }

    // Create a unique index for string transaction IDs only
     await collection.createIndex(
        { transactionId: 1 },
      { unique: true, partialFilterExpression: { transactionId: { $type: 'string' } }, name: 'transactionId_1' }
     );
      console.log('✅ Created unique index for string transaction IDs');

     // Verify the index was created
      const newIndexes = await collection.indexes();
    const transactionIdIndex = newIndexes.find(idx => idx.name === 'transactionId_1');
     if (transactionIdIndex) {
        console.log('✅ Index verification:', {
        name: transactionIdIndex.name,
         unique: transactionIdIndex.unique,
          partialFilterExpression: transactionIdIndex.partialFilterExpression
      });
     }

    await mongoose.connection.close();
     console.log('✅ Database connection closed');
      process.exit(0);
  } catch (error) {
     console.error('❌ Error fixing payment index:', error);
      process.exit(1);
  }
}

fixPaymentIndex();

