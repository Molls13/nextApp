const client = require('contentful').createClient({
  space: process.env.CONTENTFUL_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export const fetchEntries = async () => {
  const entries = await client.getEntries()

  return entries.items.map(entry => ({
    name: entry.fields.name,
    description: entry.fields.description,
    price: entry.fields.price,
    id: entry.sys.id,
    image: entry.fields.image.fields.file.url
  }))
}

export default { fetchEntries }