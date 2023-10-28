import axios from "axios"

export default async () => {
  try {
    const response = await axios('https://dummyjson.com/products')
    return Response.json(response.data)
  } catch (error) {
    return Response.json({ code: error.code, message: error.message }, { status: 500 })
  }
}