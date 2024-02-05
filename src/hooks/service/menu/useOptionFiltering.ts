import useSetMenuOption from '@/hooks/query/menu/menu-item/useSetMenuOption';
import useSetMenuOptionDetail from '@/hooks/query/menu/menu-item/useSetMenuOptionDetail';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import useMenuOptionStore, {
  NewMenuOptionWithDetail,
  NewOptionDetailType,
  setChangeMenuOptions,
  setMenuOptions,
} from '@/shared/store/menu/menu-option';
import { Tables } from '@/types/supabase';

const useOptionFiltering = () => {
  const { addOptionMutate, updateOptionMutate, removeOptionMutate } = useSetMenuOption();
  const { addUpsertOptionDetailMutate } = useSetMenuOptionDetail();
  const menuItem = useMenuItemStore(state => state.menuItem);
  const menuOptions = useMenuOptionStore(state => state.menuOptions);
  const origineMenuOptions = useMenuOptionStore(state => state.origineMenuOptions);
  const changeMenuOptions = useMenuOptionStore(state => state.changeMenuOptions);

  // 메뉴 옵션 ID 필터링 이벤트
  const fetchMenuOptionData = (menuId: string) => {
    const filterMenuOptionList = origineMenuOptions.filter(item => item.menu_id === menuId);
    setMenuOptions(filterMenuOptionList);
  };

  // 옵션 삭제시 필터링
  const removerOptionHandler = () => {
    const missingInMenuOptions = origineMenuOptions.filter(item =>
      menuOptions.some(menu => menu.menu_id === item.menu_id),
    );
    const missingItems = missingInMenuOptions.filter(item => !menuOptions.some(menu => menu.id === item.id));
    // 옵션이 전부 삭제 됐을 때 처리
    const missingInOrigineOptions = origineMenuOptions.filter(item => item.menu_id === menuItem.id);

    if (missingItems.length === 0 && menuOptions.length === 0 && missingInOrigineOptions.length !== 0) {
      missingInOrigineOptions.forEach(async item => {
        removeOptionMutate(item.id);
      });
    } else if (missingItems.length > 0) {
      missingItems.forEach(async item => {
        removeOptionMutate(item.id);
      });
    }
  };

  // 옵션 추가, 수정 필터링
  const filterOptionHandler = () => {
    const differences = findDifferences(menuOptions, origineMenuOptions);
    differences.map(async item => {
      if (item.id === '') {
        // 옵션 항목 supabase에 추가
        const newOption = {
          name: item.name,
          is_use: item.is_use,
          max_detail_count: item.max_detail_count,
          menu_id: item.menu_id,
        };
        const { data: optionData } = await addOptionMutate(newOption);

        // 해당 data 받아서 그 option_id로 detail들 추가
        item.menu_option_detail.map(async option => {
          const addOptionForm: Omit<Tables<'menu_option_detail'>, 'id'> = {
            name: option.name,
            option_id: optionData[0].id,
            price: Number(option.price),
          };
          addUpsertOptionDetailMutate(addOptionForm);
        });
        const newOptionList: NewMenuOptionWithDetail = {
          id: optionData[0].id,
          name: optionData[0].name,
          is_use: optionData[0].is_use,
          max_detail_count: optionData[0].max_detail_count,
          menu_id: optionData[0].menu_id,
          menu_option_detail: item.menu_option_detail,
        };
        setChangeMenuOptions([...changeMenuOptions, { ...newOptionList }]);
      } else {
        // 옵션은 있는거니까 해당 detail을 옵션 아이디로 supabase 추가
        updateOptionMutate(item);
        const newOptionList: NewMenuOptionWithDetail = {
          id: item.id,
          name: item.name,
          is_use: item.is_use,
          max_detail_count: item.max_detail_count,
          menu_id: item.menu_id,
          menu_option_detail: [],
        };
        // 디테일 있는것도 있고 없는것도 있으니까 upsert
        item.menu_option_detail.map(async option => {
          const addOptionForm: Omit<Tables<'menu_option_detail'>, 'id'> | Tables<'menu_option_detail'> = {
            name: option.name,
            option_id: newOptionList.id,
            price: Number(option.price),
          };

          if (option.id !== '') (addOptionForm as Tables<'menu_option_detail'>).id = option.id;

          addUpsertOptionDetailMutate(addOptionForm);
        });
      }
    });
  };

  // 옵션 비교 함수
  const findDifferences = (optionNowArray: NewMenuOptionWithDetail[], optionOriginArray: NewMenuOptionWithDetail[]) => {
    const differentArray: NewMenuOptionWithDetail[] = [];

    optionNowArray.forEach(itemNum1 => {
      const itemNum2 = optionOriginArray.find(findItem => findItem.id === itemNum1.id);

      if (
        !itemNum2 ||
        itemNum1.is_use !== itemNum2.is_use ||
        itemNum1.name !== itemNum2.name ||
        itemNum1.max_detail_count !== itemNum2.max_detail_count ||
        !compareMenuOptions(itemNum1.menu_option_detail, itemNum2.menu_option_detail)
      ) {
        differentArray.push(itemNum1);
      }
    });

    return differentArray;
  };

  // 옵션 디테일 배열을 비교하는 함수
  const compareMenuOptions = (optionNowArray: NewOptionDetailType[], optionOriginArray: NewOptionDetailType[]) => {
    const newItems = [];

    optionNowArray.forEach(itemNum1 => {
      const itemNum2 = optionOriginArray.find(item => item.name === itemNum1.name);

      if (!itemNum2) {
        newItems.push(itemNum1);
      }
    });

    return newItems.length === 0; // 반환 값이 true이면 두 배열이 같다는 것을 의미
  };

  return {
    fetchMenuOptionData,
    removerOptionHandler,
    filterOptionHandler,
  };
};

export default useOptionFiltering;
