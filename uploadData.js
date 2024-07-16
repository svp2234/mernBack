const admin = require('firebase-admin');
const serviceAccount = require('./dishes-dashboard-firebase-adminsdk-ex4dm-dc82c5f379.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dishes-dashboard.firebaseio.com'
});

const db = admin.firestore();

// JSON data. You can add data here to resemble them in the frontend dashboard by running this file using "node uploadData.js"
const dishes = [
  {
    "dishName": "Jeera Rice",
    "dishId": "1",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
    "isPublished": true
  },
  {
    "dishName": "Paneer Tikka",
    "dishId": "2",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
    "isPublished": true
  },
  {
    "dishName": "Rabdi",
    "dishId": "3",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
    "isPublished": true
  },
  {
    "dishName": "Chicken Biryani",
    "dishId": "4",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
    "isPublished": true
  },
  {
    "dishName": "Alfredo Pasta",
    "dishId": "5",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
    "isPublished": true
  }
];

// Function to upload data
const uploadData = async () => {
  const batch = db.batch();

  dishes.forEach(dish => {
    const dishRef = db.collection('dishes').doc(dish.dishId);
    batch.set(dishRef, dish);
  });

  await batch.commit();
  console.log('Data successfully uploaded to Firestore!');
};

// Call the function
uploadData().catch(console.error);
