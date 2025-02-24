export async function uploadPdf(data) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/upload-pdf/`,
    {
      method: "POST",
      body: data,
    }
  );
  if (response.ok) {
    return await response.json();
  }
  throw new Error("Failed to upload PDF.");
}
