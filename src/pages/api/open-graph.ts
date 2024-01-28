import { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper';
interface ExtendsNextApiRequest extends NextApiRequest {
  body: {
    url: string;
  };
}

export default async function handler(req: ExtendsNextApiRequest, res: NextApiResponse) {
  const { url } = req.body;
  const options = { url };
  try {
    const { result } = await ogs(options);
    if (result) {
      res.status(200).send(result.ogImage![0].url);
    }
  } catch (error) {
    res.status(500).send('링크의 정보를 가져오는데 실패했습니다.');
  }
}
