export async function addSubscriberToForm({
  email,
  firstName,
  convertKitFormId,
}: {
  email: string;
  firstName: string;
  convertKitFormId: string;
}) {
  const subscriberData = {
    api_key: process.env.CONVERT_KIT_API_KEY,
    api_secret: process.env.CONVERT_KIT_API_SECRET,
    first_name: firstName,
    email,
  };

  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`,
    {
      method: "post",
      body: JSON.stringify(subscriberData),
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log('convert kit response', response);
  const json = (await response.json()) as {
    subscription: { subscriber: any };
  };
  return json.subscription.subscriber;
}
