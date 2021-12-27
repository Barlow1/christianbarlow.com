export default async function getPostsMetaData() {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/.netlify/functions/get-posts`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
