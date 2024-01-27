import { sendFCMNotification } from '@/server/service/send-fcm';
import { NextApiRequest, NextApiResponse } from 'next';

const sendFCMHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    console.log('API Router message: ', message);
    await sendFCMNotification(message)
      .then(result => res.status(200).json({ result }))
      .catch(error => console.log(error));
  } else {
    res.status(405).end();
  }
};

export default sendFCMHandler;
