// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  const response = await fetch('http://localhost:1234/outer/api/questions', {
    method: 'POST',
    body: JSON.stringify({
      trace_id: '2ad1131c-309b-4507-97c9-3c91f1588cdf',
      version: 'UNKNOWN_VERSION',
      data: {},
    }),
  });
  const data = await response.json();

  // get questions data from judger service
  res.status(200).json({
    data: data?.data,
  });
}
