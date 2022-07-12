// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from 'mongodb'

const getQuantity = async id => {
  // client CANNOT be reopened once closed, must be reinstantiated
  const client = new MongoClient(process.env.ATLAS_URI);
  client.on("open", () => console.log('CONNECTED'))
  client.on("close", () => console.log("DISCONNECTED"));

  await client.connect();
  const db = client.db('Products');
  const collection = db.collection('Product-quantity');
  const result = await collection.findOne({ ProductId: id })
  client.close();
  return result.Quantity;
}

export async function handler(event, context) {
  const { id } = event.queryStringParameters
  const quantity = await getQuantity(id)

  return ({
    statusCode: 200,
    body: JSON.stringify({
      id,
      quantity
    })
  })
}
