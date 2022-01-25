import InputError from "./InputError";

export interface FieldProps {
  name: string;
  type: string;
  error: string | null;
  label: string;
  disabled?: boolean;
}

export default function Field({
  name,
  type,
  error,
  label,
  disabled,
}: FieldProps) {
  const errorId = `${name}-error`;
  const getInputByType = (type: string) => {
      switch(type) {
          case('textarea'):
          return (
            <textarea disabled={disabled} name={name} ></textarea>
          );
          break;
          default:
              return <input disabled={disabled} name={name} type={type} />;

      }

  }
  const input = getInputByType(type);
  return (
    <>
      <label htmlFor={name}>{label}</label>
      {error ? <InputError id={errorId}>{error}</InputError> : null}
      {input}
    </>
  );
}
