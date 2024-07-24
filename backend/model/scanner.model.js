import mongoose from 'mongoose';

const scannerSchema = new mongoose.Schema({
  scannerId: { type: String, required: true, unique: true },
  name: { type: String, required: true } // E.g., bus, class, college
});

const Scanner = mongoose.model('Scanner', scannerSchema);

    export default Scanner;