import { MongoClient } from 'mongodb'
// import Cors from 'cors'

// const cors = Cors({
//   methods: ['POST', 'GET', 'HEAD'],
// })

// function runMiddleware(
//   req,
//   res,
//   fn
// ) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result)
//       }

//       return resolve(result)
//     })
//   })
// }

const updateQuantity = async id => {
  // client CANNOT be reopened once closed, must be reinstantiated
  const client = new MongoClient(process.env.ATLAS_URI);
  client.on("open", () => console.log('CONNECTED'))
  client.on("close", () => console.log("DISCONNECTED"));

  await client.connect();
  const db = client.db('Products');
  const collection = db.collection('Product-quantity');
  const result = await collection.findOneAndUpdate({ ProductId: id }, { $inc: { Quantity: -1 } }, { returnDocument: "after" })
  client.close();
  return result;
}

export default async function handler(req, res) {
  // await runMiddleware(req, res, cors)
  if (req.method !== "POST") {
    return res.status(405).json({ status: "failure", error: 'Only accept POST' });
  }
  const { id } = req.query;
  try {
    const result = await updateQuantity(id);
    return res.status(200).json({ status: "success", result })
  } catch (e) {
    return res.status(400).json({ status: "failure", error: e.message })
  }
}