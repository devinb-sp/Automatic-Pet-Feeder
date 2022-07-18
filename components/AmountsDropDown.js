import React, { useState, useEffect } from 'react';
import { ApiHelper } from '../helpers/api_helper';
('../helpers/api_helper');
import DropDownPicker from 'react-native-dropdown-picker';
import settingsStyles from '../stylesheets/settingsStyles';

const apiHelper = new ApiHelper();

const AmountsDropDown = ({ handleAmountChange, index, zIndex }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '1/4 Cup', value: '0.25' },
    { label: '1/2 Cup', value: '0.5' },
    { label: '1 Cup', value: '1' },
  ]);

  useEffect(() => {
    changeDisplayAmount();
  }, []);

  const changeDisplayAmount = async () => {
    const result = await apiHelper.getFoodSchedule();

    if (result.food.amounts[index]) {
      setValue(result.food.amounts[index].toString());
      handleAmountChange(result.food.amounts[index].toString());
    }
  };

  const setValues = (amount) => {
    setValue(amount);
    handleAmountChange(amount);
  };

  return (
    <DropDownPicker
      style={settingsStyles.dropdown}
      dropDownContainerStyle={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        fontFamily: 'RobotoRegular',
        borderColor: 'lightgray',
        borderWidth: 1,
        width: '90%',
        marginBottom: 20,
        marginRight: '5%',
        marginLeft: '5%',
      }}
      placeholder="Select amount of food"
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValues}
      setItems={setItems}
      listMode="SCROLLVIEW"
    />
  );
};

export default AmountsDropDown;
