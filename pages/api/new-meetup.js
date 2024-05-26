import { MongoClient } from 'mongodb';
// /api/new-meetup

// POST /api/new-meetup
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // credential, private code => not run on the client side!
        const client = await MongoClient.connect(`mongodb+srv://ryanbhang129:${process.env.API_KEY}@cluster0.2eujcff.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0`);
        const db = client.db(); // Read, created if not existing

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup Inserted!'});
    }
}
