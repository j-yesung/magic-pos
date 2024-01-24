import { CategoryWithMenuItem } from '@/types/supabase';
import * as deepl from 'deepl-node';
import { TargetLanguageCode } from 'deepl-node';

const AUTH_KEY = process.env.NEXT_PUBLIC_DEEPL_API_KEY as string; // Replace with your key
const TRANSLATOR = new deepl.Translator(AUTH_KEY);

/**
 * 메뉴 데이터를 DeepL API를 이용하여 지정된 언어로 번역한다.
 * @param menuData
 * @param lang
 */
export const translateMenuData = async (menuData: CategoryWithMenuItem[], lang: string) => {
  const categoryList: string[] = [];
  const menuList: string[] = [];
  const optionList: string[] = [];
  const optionDetailList: string[] = [];

  menuData.forEach(menu => {
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

  const translatedCategory = await TRANSLATOR.translateText(categoryList, 'ko', stringToTargetLanguageCode(lang));
  const translatedMenu = await TRANSLATOR.translateText(menuList, 'ko', stringToTargetLanguageCode(lang));
  const translatedOption = await TRANSLATOR.translateText(optionList, 'ko', stringToTargetLanguageCode(lang));
  const translatedOptionDetail = await TRANSLATOR.translateText(
    optionDetailList,
    'ko',
    stringToTargetLanguageCode(lang),
  );

  let categoryIndex = 0;

  for await (const result of translatedCategory) {
    const endBracketIndex = result.text.indexOf(')');
    const endOtherBracketIndex = result.text.indexOf('）');
    let bracketIndex = endBracketIndex;
    if (endBracketIndex === -1) bracketIndex = endOtherBracketIndex;

    menuData[categoryIndex].name = result.text.substring(bracketIndex + 1);
    categoryIndex++;
  }

  let menuIndex = 0;
  let optionIndex = 0;
  let optionDetailIndex = 0;
  menuData.forEach(menu => {
    return menu.menu_item.forEach(item => {
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
  });

  return menuData;
};

export const stringToTargetLanguageCode = (lang: string): TargetLanguageCode => {
  if (lang === 'en') return 'en-US';
  else if (lang === 'zh') return lang;
  else if (lang === 'ja') return lang;
  return 'ko';
};
