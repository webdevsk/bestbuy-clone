export default async (req, context) => {
    try {
        console.log(req.headers.get("authorization"))
        console.log(req.body)

    } catch (error) {
        return Response.json(error, { status: 500 })
    }
}