const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function fetchEntries() {
  const entries = await client.getEntries()
  return entries.items.map(entry => ({
    name: entry.fields.name,
    description: entry.fields.description,
    price: entry.fields.price,
    quantity: entry.fields.quantity,
    id: entry.sys.id
  }))
}

export default { fetchEntries }