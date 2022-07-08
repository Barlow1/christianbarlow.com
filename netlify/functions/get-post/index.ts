import { Handler } from "@netlify/functions";

/* configure prisma Client with our secret */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type GetPostParameters = {
  slug: string;
}

/* export our lambda function as named "handler" export */
export const handler: Handler = async (event, context) => {
const { slug } = event.queryStringParameters as GetPostParameters;
  await prisma.$connect();
  const response = prisma.post.findUnique({
    where: {
      slug: slug
    }
  });
  return response
    .then((resp) => {
      console.log("success");
      return {
        statusCode: 200,
        body: JSON.stringify(resp),
      };
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    })
};
