const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./dishes-dashboard-firebase-adminsdk-ex4dm-dc82c5f379.json'); // Ensure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Fetch all dishes
app.get('/dishes', async (req, res) => {
  try {
    const snapshot = await db.collection('dishes').get();
    const dishes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(dishes);
  } catch (error) {
    res.status(500).send('Error fetching dishes: ' + error.message);
  }
});

// Toggle the publish status of a dish
app.patch('/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const { isPublished } = req.body;

  try {
    const dishRef = db.collection('dishes').doc(id);
    await dishRef.update({ isPublished });
    res.send('Dish status updated');
  } catch (error) {
    res.status(500).send('Error updating dish status: ' + error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

