import { CategoryWithMenuItem } from '@/types/supabase';
import * as deepl from 'deepl-node';
import { TargetLanguageCode } from 'deepl-node';

type MenuDataType = {
  [key: string]: {
    data: {
      [key in string]: CategoryWithMenuItem[];
    };
    origin: string;
  };
};

const CACHED_MENU_DATA: MenuDataType = {};

const AUTH_KEY = process.env.NEXT_PUBLIC_DEEPL_API_KEY as string; // Replace with your key
const TRANSLATOR = new deepl.Translator(AUTH_KEY);

/**
 * 메뉴 데이터를 DeepL API를 이용하여 지정된 언어로 번역한다.
 * @param menuData
 * @param lang
 * @param storeId
 */
export const translateMenuData = async (menuData: CategoryWithMenuItem[], lang: string, storeId: string) => {
  // API 반복 호출을 막기 위해 한 가게에 대하여 한번 번역을 했으면 그 이후로는 번역된 데이터를 꺼내서 가져온다
  let storeMenuData = CACHED_MENU_DATA[storeId];

  // storeMenuData가 초기화 되지 않았다면 초기화 해준다.
  if (!storeMenuData) {
    CACHED_MENU_DATA[storeId] = {
      data: {
        en: [],
        ja: [],
        zh: [],
      },
      origin: '',
    };
    storeMenuData = CACHED_MENU_DATA[storeId];
  }

  if (lang && lang !== 'ko' && lang !== '' && lang !== 'origin') {
    if (storeMenuData.data[lang] && storeMenuData.data[lang]?.length === 0) {
      storeMenuData.data[lang] = menuData;

      // origin에 menuData를 직렬화해서 담는다.
      storeMenuData.origin = JSON.stringify(menuData);

      // menuData가 바뀌지 않았으면 이전에 저장해놓은 데이터를 보여준다.
      // 그렇지 않으면 새로 번역을 시작한다.
    } else if (JSON.stringify(menuData) === CACHED_MENU_DATA[storeId].origin) {
      return CACHED_MENU_DATA[storeId].data[lang];
    }
  }

  const categoryList: string[] = [];
  const menuList: string[] = [];
  const optionList: string[] = [];
  const optionDetailList: string[] = [];

  // 번역할 단어 목록을 생성한다.
  menuData.forEach(menu => {
    // 번역의 정확도를 위해 (가게 메뉴)라는 키워드를 넣어서 보낸다. 이후 괄호와 괄호안 텍스트를 제거하는 작업이 추가적으로 필요하다.
    if (menu.name) categoryList.push('(가게 메뉴)' + menu.name);
    menu.menu_item.forEach(item => {
      if (item.name) menuList.push(item.name);
      item.menu_option.forEach(option => {
        if (option.name) optionList.push(option.name);
        option.menu_option_detail.forEach(detail => {
          if (detail.name) optionDetailList.push(detail.name);
        });
      });
    });
  });

  console.log(`storeID: ${storeId}에서 ${lang}에 대한 번역을 시작합니다...`);
  const translatedCategory = await TRANSLATOR.translateText(categoryList, 'ko', stringToTargetLanguageCode(lang));
  const translatedMenu = await TRANSLATOR.translateText(menuList, 'ko', stringToTargetLanguageCode(lang));
  const translatedOption = await TRANSLATOR.translateText(optionList, 'ko', stringToTargetLanguageCode(lang));
  const translatedOptionDetail = await TRANSLATOR.translateText(
    optionDetailList,
    'ko',
    stringToTargetLanguageCode(lang),
  );

  let categoryIndex = 0;
  let menuIndex = 0;
  let optionIndex = 0;
  let optionDetailIndex = 0;
  menuData.forEach(menu => {
    const translatedCategoryText = translatedCategory[categoryIndex].text;
    const endBracketIndex = translatedCategoryText.indexOf(')');
    const endOtherBracketIndex = translatedCategoryText.indexOf('）');
    let bracketIndex = endBracketIndex;
    if (endBracketIndex === -1) bracketIndex = endOtherBracketIndex;

    menu.name = translatedCategoryText.substring(bracketIndex + 1);
    menu.menu_item.forEach(item => {
      item.name = translatedMenu[menuIndex].text;
      menuIndex++;

      item.menu_option.forEach(option => {
        option.name = translatedOption[optionIndex].text;
        optionIndex++;

        option.menu_option_detail.forEach(detail => {
          detail.name = translatedOptionDetail[optionDetailIndex].text;
          optionDetailIndex++;
        });
      });
    });
    categoryIndex++;
  });

  return menuData;
};

export const stringToTargetLanguageCode = (lang: string): TargetLanguageCode => {
  if (lang === 'en') return 'en-US';
  else if (lang === 'zh') return lang;
  else if (lang === 'ja') return lang;
  return 'ko';
};
