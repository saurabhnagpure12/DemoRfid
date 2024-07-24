import Scanner from '../model/scanner.model.js';

export const addScanner = async (req, res) => {
  try {
    const { scannerId, name } = req.body;
    const newScanner = new Scanner({ scannerId, name });
    await newScanner.save();
    res.status(201).json(newScanner);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add scanner', error });
  }
};

export const getScanners = async (req, res) => {
  try {
    const scanners = await Scanner.find();
    res.status(200).json(scanners);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get scanners', error });
  }
};
