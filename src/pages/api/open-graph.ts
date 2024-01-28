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
    console.log('asidjfiasdj', result);
    if (result) {
      res.status(200).send(result.ogImage![0].url);
    }
  } catch (error) {
    res.status(500).send('링크의 정보를 가져오는데 실패했습니다.');
  }
}

// const getOpenMeta = async (url: string) => {
//   try {
//     ogs;
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);
//     // 웹 페이지의 meta Image입니다.
//     return $('meta[property="og:image"]').attr('content');
//   } catch (error) {
//     throw error;
//   }
// };
