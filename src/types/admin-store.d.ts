declare interface OptionType {
  value: string;
  label: string;
}

declare type TimeState = Record<string, string>;

interface BaseProps {
  times: TimeState;
}

interface Item {
  id: number;
  name: string;
  label: string;
  defaultValue: string;
}

declare interface StoreSelectBoxProps extends BaseProps {
  item: Item;
  setTimes: React.Dispatch<React.SetStateAction<TimeState>>;
}

declare interface StoreSetButtonProps extends BaseProps {
  userId: string;
}
