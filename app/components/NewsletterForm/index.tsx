import { useFetcher } from "remix";
import { ActionData } from "~/utils/newsletter/types";
import { H4, Paragraph } from "../Typography";

export function NewsletterForm() {
  const newsletter = useFetcher();
  const data: ActionData | null = newsletter.type === "done" ? newsletter.data : null;
  const success = data?.status === 'success';
  return (
    <newsletter.Form
      action="actions/newsletter-signup"
      method="post"
      noValidate
    >
      <H4>Join the Newsletter!</H4>
      <Paragraph>Stay up to date by getting our content by email.</Paragraph>
      <input
        type="hidden"
        name="newsletter-convert-kit-form-id"
        value={"2939376"}
      ></input>
      <input
        type="hidden"
        name="newsletter-sign-up-form-id"
        value={"newsletter"}
      />
      <Field
        name="newsletter-sign-up-name"
        type="text"
        label="First Name"
        error={data?.status === "error" ? data.errors.firstName : null}
        disabled={newsletter.state === "loading" || success}
      />
      <Field
        name="newsletter-sign-up-email"
        type="email"
        label="Email"
        error={data?.status === "error" ? data.errors.email : null}
        disabled={newsletter.state === "loading" || success}
      />
      {success ? (
        <p>Success! Now check your email to confirm your subscription.</p>
      ) : (
        <button type="submit" className="underlined">
          Subscribe
        </button>
      )}
    </newsletter.Form>
  );
}

interface FieldProps {
  name: string;
  type: string;
  error: string | null;
  label: string;
  disabled?: boolean;
}

function Field({ name, type, error, label, disabled }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      {error ? <InputError id={errorId}>{error}</InputError> : null}
      <input disabled={disabled} name={name} type={type} />
    </>
  );
}

interface InputErrorProps {
  id: string;
  children?: string | null;
}

function InputError({ children, id }: InputErrorProps): JSX.Element | null {
  if (!children) {
    return null;
  }
  return (
    <p role={"alert"} id={id} className="text-red-500 text-sm">
      {children}
    </p>
  );
}
