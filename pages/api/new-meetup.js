// api/new-meetup
import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://iharbakhanovich:1RMHjZTNRQ9hoqO3@cluster0.llzeyal.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: 'meetup inserted', insertedObject: result});

  }
};

export default handler;
