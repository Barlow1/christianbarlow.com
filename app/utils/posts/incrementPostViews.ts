export default async function getPostsMetaData(slug: string) {
  const baseUrl = process.env.BASE_URL;
  const url = `${baseUrl}/.netlify/functions/increment-post-views?slug=${slug}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
