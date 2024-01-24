import Select, { StylesConfig } from 'react-select';
import { createTimeOptions, timeOption } from '../../../utils/time-format';

export const customStyles: StylesConfig<OptionType, false> = {
  control: provided => ({
    ...provided,
    width: '16rem',
    height: '5rem',
    fontWeight: '500',
    fontSize: '1.5rem',
    textAlign: 'center',
    color: '#000000',
    background: '#fff',
    borderRadius: '0.5rem',
    boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.10)',
  }),
  menu: provided => ({
    ...provided,
    width: '16rem',
    fontWeight: '500',
    fontSize: '1.5rem',
    color: '#000000',
    textAlign: 'center',
    borderRadius: '0.5rem',
  }),
};

const StoreSelectBox = (props: StoreSelectBoxProps) => {
  const { times, item, setTimes } = props;
  const updateTimeState = (name: string, value: string) => setTimes(prevTimes => ({ ...prevTimes, [name]: value }));
  const timeOptions = createTimeOptions(timeOption);

  return (
    <Select
      styles={customStyles}
      name={item.name}
      id={item.name}
      onChange={option => updateTimeState(item.name, option?.value ?? '')}
      value={timeOptions.find(option => option.value === times[item.name])}
      options={timeOptions.filter(option => (item.name === 'endTime' ? option.value > times.startTime : true))}
      placeholder={item.defaultValue}
    />
  );
};

export default StoreSelectBox;
