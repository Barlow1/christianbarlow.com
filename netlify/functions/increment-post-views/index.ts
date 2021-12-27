import { Handler } from "@netlify/functions";

/* configure prisma Client with our secret */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface IncrementPostParameters {
    slug?: string;
}

/* export our lambda function as named "handler" export */
export const handler: Handler = async (event, context) => {
  const { slug } = event.queryStringParameters as IncrementPostParameters;
  await prisma.$connect();

  const response = prisma.post.update({
      where: {
          slug: slug
      },
      data: {
          views: {
              increment: 1,
          }
      }
  });
  return response
    .then((resp) => {
      console.log("update success", resp);
      return {
        statusCode: 200,
        body: JSON.stringify(resp),
      };
    })
    .catch((error) => {
      console.log("update error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
