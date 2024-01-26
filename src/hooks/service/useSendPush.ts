import axios from 'axios';

interface Message {
  title: string;
  body: string;
  click_action: string;
}

const useSendPush = () => {
  const sendPush = async (props: Message) => {
    const { title, body, click_action } = props;
    const message = {
      data: {
        title,
        body,
        image: '/public/icons/icon-192x192.png',
        click_action,
      },
    };

    axios.request({
      method: 'POST',
      url: window?.location?.origin + '/api/fcm',
      data: { message },
    });
  };

  return sendPush;
};

export default useSendPush;
