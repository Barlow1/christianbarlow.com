import { Form } from "remix";
import { NewsletterForm } from "../NewsletterForm";
import { H4 } from "../Typography";

export function Footer() {
  return (
    <>
      <NewsletterForm />
      <p>&copy; 2022 Christian Barlow</p>
    </>
  );
}
