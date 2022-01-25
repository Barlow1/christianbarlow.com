import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { ActionFunction, useFetcher } from "remix";
import Field from "~/components/FormElements/Field";
import { H4, Paragraph } from "~/components/Typography";
import { handleContactFormSubmission } from "~/utils/contact/handler.server";

export const action: ActionFunction = ({request}: {request: Request}) => {
    return handleContactFormSubmission(request);
}

export default function ContactPage() {
const ref = useRef<HTMLFormElement>(null);
const contactForm = useFetcher();
const data = contactForm.type === "done" ? contactForm.data : null;
const success = data?.status === "success";

useEffect(() => {
    if (ref.current && success) {
        ref.current.reset();
    }
}, [success])
return (
  <contactForm.Form ref={ref} action="/contact" method="post">
    <H4>Nice to meet you. Let's chat!</H4>
    <Field
      name="name"
      type="text"
      label="First Name"
      error={data?.status === "error" ? data.errors.name : null}
      disabled={contactForm.state === "loading" || success}
    />
    <Field
      name="email"
      type="email"
      label="Email"
      error={data?.status === "error" ? data.errors.email : null}
      disabled={contactForm.state === "loading" || success}
    />
    <Field
      name="message"
      type="textarea"
      label="Message"
      error={data?.status === "error" ? data.errors.message : null}
      disabled={contactForm.state === "loading" || success}
    />
    {success ? <Paragraph>Success! Your email has been sent.</Paragraph>: <button type="submit" className="underlined pt-1">
      Send <FontAwesomeIcon icon={faPaperPlane} />
    </button>}
  </contactForm.Form>
);}