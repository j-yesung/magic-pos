import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function businessNumberCheck(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'POST') {
    const data = { b_no: [req.body.value] };
    const response = await axios.post(
      `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${process.env.NEXT_PUBLIC_PUBLIC_DATA_API_KEY}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return res.status(200).json(response.data);
  }
}
