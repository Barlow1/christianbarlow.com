import { SEOHandle } from "@balavishnuvj/remix-seo";
import { ActionFunction } from "remix";
import { handleConvertKitFormSubmission } from "~/utils/newsletter/handler.server";

export const handle: SEOHandle = {
  getSitemapEntries: () => null,
};

export const action: ActionFunction = ({request}) => {
    return handleConvertKitFormSubmission(request);
}

export default function NewsletterSignUp() {
    return <h1>Success! Now check your email to confirm your subscription.</h1>;
}