const reviewContents = ['This is review number 1', 'This is review number 2', 'This is review number 3'];
const icons = ['🐶', '🐻', '🐮', '🐻‍❄️', '🐵'];
const storeNames = ['스타벅스', '이디야', '투썸플레이스', '커피빈', '할리스'];
const bgColors = ['#E1FFE2', '#FFEFEF', '#E6F6FF'];
const fontColors = ['#34C33A', '#FF5656', '#54A9E6'];

/**
 * 더미 데이터 생성하는 함수
 * @param num 생성 개수
 * @returns 더미 데이터
 */
export const createDummyData = (num: number) => {
  const data = [];

  for (let i = 0; i < num; i++) {
    const n = Math.floor(Math.random() * 12) + 1;
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const storeName = storeNames[Math.floor(Math.random() * storeNames.length)];
    const randomIndex = Math.floor(Math.random() * bgColors.length);

    const item = {
      id: i + 1,
      icon,
      storeName,
      bgColor: bgColors[randomIndex],
      fontColor: fontColors[randomIndex],
      nWeeksLater: n,
      reviewContent:
        '정말 맛집으로 소문날 거 같아요.. 맛있어요!! 다음에 또 먹을래요!! 사진 맛집으로 올려야겠어요!! 정말 맛집으로 소문날 거 같아요.. 맛있어요!! 다음에 또 먹을래요!! 사진 맛집으로 올려야겠어요!!정말 맛집으로 소문날 거 같아요..',
    };

    data.push(item);
  }

  return data;
};
