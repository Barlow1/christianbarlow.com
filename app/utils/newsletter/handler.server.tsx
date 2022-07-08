import { json } from "@remix-run/node";
import { addSubscriberToForm } from "./newsletter.server";
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

function getErrorForConvertKitFormId(
  formId: string | null,
  form: URLSearchParams
) {
  if (!formId) return null;
  if (formId.length < 2) return `Convert Kit Form ID is incorrect`;
  return null;
}

function getErrorForFormId(value: string | null) {
  if (!value) return `Form ID is required`;
  return null;
}

async function handleConvertKitFormSubmission(request: Request) {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);

  const fields: Fields = {
    formId: form.get("newsletter-sign-up-form-id") ?? "",
    firstName: form.get("newsletter-sign-up-name") ?? "",
    email: form.get("newsletter-sign-up-email") ?? "",
    convertKitFormId: form.get("newsletter-convert-kit-form-id") ?? "",
  };

  const errors: Errors = {
    generalError: null,
    formId: getErrorForFormId(fields.formId),
    firstName: getErrorForFirstName(fields.firstName),
    email: getErrorForEmail(fields.email),
    convertKitFormId: getErrorForConvertKitFormId(
      fields.convertKitFormId,
      form
    ),
  };

  let data: ActionData;

  if (Object.values(errors).some((err) => err !== null)) {
    data = { status: "error", errors };
    return json(data, 400);
  }

  try {
    let subscriberId: number | null = null;
    if (fields.convertKitFormId) {
      const subscriber = await addSubscriberToForm(fields);
      subscriberId = subscriber.id;
    }

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

export { handleConvertKitFormSubmission };
