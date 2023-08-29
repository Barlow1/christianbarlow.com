import { readFileSync } from "fs";
import sanitize from "sanitize-filename";

const getFileContents = (filename: string) =>
  readFileSync(`./public/${sanitize(filename)}.pdf`);

type ParamsType = {
  filename: string;
};

export async function loader({ params }: { params: ParamsType }) {
  try {
    const { filename } = params;
    const pdf = getFileContents(filename);
    return new Response(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch {
    return new Response("File Not Found.", {
      status: 404,
    });
  }
}
