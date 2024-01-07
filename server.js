import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const app = express();
const port = 3001;

const mongoURI = 'mongodb://localhost:27017';
const dbName = 'your_database_name';

app.use(cors({ origin: '*' }));
app.options('*', cors());
app.use(express.json());

let db;

async function connectToDatabase() {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('MongoDB connection established successfully');
    db = client.db(dbName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

async function getUser(email) {
  const usersCollection = db.collection('users');
  const user = await usersCollection.findOne({ email });
  return user;
}

connectToDatabase();

app.post('/api/trips/add', async (req, res) => {
  try {
    const { departure, destination, date, availableSeats, price } = req.body;

    if (!db) {
      console.error('Database connection is missing.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const tripsCollection = db.collection('trips');
    const initialSeatStatus = Array(availableSeats).fill(false);
    initialSeatStatus.fill(true, 0, 5);

    const newTrip = {
      departure,
      destination,
      date,
      availableSeats,
      price,
      seatStatus: initialSeatStatus,
    };

    const result = await tripsCollection.insertOne(newTrip);
    console.log('New trip successfully added:', result.insertedId);

    res.json({ success: true, message: 'Trip added successfully', tripId: result.insertedId });
  } catch (error) {
    console.error('Error adding trip:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/trips/updateSeatStatus', async (req, res) => {
  try {
    const { tripId, seatIndex, isOccupied } = req.body;

    if (!db) {
      console.error('Database connection is missing.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const tripsCollection = db.collection('trips');
    const trip = await tripsCollection.findOne({ _id: ObjectId(tripId) });

    if (!trip) {
      console.error('Trip not found.');
      return res.status(404).json({ error: 'Trip not found' });
    }

    trip.seatStatus[seatIndex] = isOccupied;

    await tripsCollection.updateOne({ _id: ObjectId(tripId) }, { $set: { seatStatus: trip.seatStatus } });

    res.json({ success: true, message: 'Seat status updated successfully' });
  } catch (error) {
    console.error('Error updating seat status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/trips', async (req, res) => {
  try {
    if (!db) {
      console.error('Database connection is missing.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const tripsCollection = db.collection('trips');
    const trips = await tripsCollection.find({}).toArray();
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error.message);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

app.get('/api/trips/:id', async (req, res) => {
  try {
    const tripId = new ObjectId(req.params.id);

    if (!db) {
      console.error('Database connection is missing.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const tripsCollection = db.collection('trips');
    const trip = await tripsCollection.findOne({ _id: tripId });

    if (!trip) {
      console.error('Trip not found.');
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    console.error('Error fetching trip details:', error.message);
    res.status(500).json({ error: 'Failed to fetch trip details' });
  }
});

app.get('/auth/user', async (req, res) => {
  const { email } = req.query;

  // Get user from database
  const user = await getUser(email);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, ad, soyad, tcNo, gender, dob } = req.body;

    if (!db) {
      console.error('Database connection is missing.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const usersCollection = db.collection('users');

    // Check if the email is already registered
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.error('User with this email already exists.');
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      ad,
      soyad,
      tcNo,
      gender,
      dob,
    };

    const result = await usersCollection.insertOne(newUser);
    console.log('New user successfully registered:', result.insertedId);

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!db) {
      console.error('Database connection is missing.');
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });

    if (!user) {
      console.error('User not found.');
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.error('Incorrect password.');
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // You can add additional information to the response if needed
    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
