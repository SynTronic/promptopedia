import { connectToDB } from '@utils/database'
import User from '@models/user'

export const GET = async(_req, { params: { id } }) => {
  try {
    await connectToDB();
    const user = await User.findById(id);
    if (!user) {
      return new Response('The user not found', {
        status: 404
      })
    }

    return new Response(JSON.stringify(user), {
      status: 200
    })
  }
  catch (error) {
    return new Response('There is an error', {
      status: 500
    })
  }
}