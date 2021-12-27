import { Handler } from "@netlify/functions";

/* configure prisma Client with our secret */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/* export our lambda function as named "handler" export */
export const handler: Handler = async (event, context) => {
  await prisma.$connect();
  const response = prisma.post.findMany();
  return response
    .then((resp) => {
      console.log("success", resp);
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
