export default async function handler(req, res) {
  const { body } = req.query
  const { publicSignals, proof } = JSON.parse(body)
  const response = await fetch(
    'http://localhost:1234/outer/api/userSignUp',
    {
      method: 'POST',
      headers: {
        authorization: 'Basic edc1ad3076d24de6aff6fd4fe3d870cc',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        trace_id: '2ad1131c-309b-4507-97c9-3c91f1588cdf',
        version: 'UNKNOWN_VERSION',
        data: {
          publicSignals, proof
        },
      }),
    }
  );

  const data = await response.json();
  console.log(data)
  // get questions data from judger service
  res.status(200).json({
    data: data?.data,
  });
}
