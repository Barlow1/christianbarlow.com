import { json } from "@remix-run/node";
import { sendEmail } from "../mailgun.server";
import { ActionData, Errors, Fields } from "./types";

function getErrorForFirstName(name: string | null) {
  if (!name) return `Name is required`;
  if (name.length > 60) return `Name is too long`;
  return null;
}

function getErrorForEmail(email: string | null) {
  if (!email) return `Email is required`;
  if (!/^.+@.+\..+$/.test(email)) return `Email is not valid`;
  return null;
}

function getErrorForMessage(message: string | null) {
  if (!message) return `Message is required`;
  return null;
}

async function handleContactFormSubmission(request: Request) {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);

  const fields: Fields = {
    name: form.get("name") ?? "",
    email: form.get("email") ?? "",
    message: form.get("message") ?? ""
  };

  const errors: Errors = {
    generalError: null,
    name: getErrorForFirstName(fields.name),
    email: getErrorForEmail(fields.email),
    message: getErrorForMessage(fields.message)
  };

  let data: ActionData;

  if (Object.values(errors).some((err) => err !== null)) {
    data = { status: "error", errors };
    return json(data, 400);
  }

  try {
    sendEmail(fields);
  } catch (error: unknown) {
    errors.generalError = getErrorMessage(error);
    data = { status: "error", errors };
    return json(data, 500);
  }

  data = { status: "success" };
  return json(data);
}

function getErrorMessage(error: unknown) {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return "Unknown Error";
}

export { handleContactFormSubmission };
