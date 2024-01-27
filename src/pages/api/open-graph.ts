import axios from 'axios';
import * as cheerio from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';
interface ExtendsNextApiRequest extends NextApiRequest {
  body: {
    url: string;
  };
}

export default async function handler(req: ExtendsNextApiRequest, res: NextApiResponse) {
  const { url } = req.body;
  try {
    const metaImage = await getOpenMeta(url);
    res.status(200).send(metaImage);
  } catch (error) {
    res.status(500).send('링크의 정보를 가져오는데 실패했습니다.');
  }
}

const getOpenMeta = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    // 웹 페이지의 meta Image입니다.
    return $('meta[property="og:image"]').attr('content');
  } catch (error) {
    throw error;
  }
};
