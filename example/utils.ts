import { useState } from 'react';

export function usePicker<T>(initialState: T) {
  const [selectedValue, setSelectedValue] = useState<T>(initialState);
  return {
    selectedValue,
    onValueChange: (value: T) => {
      setSelectedValue(value);
    }
  };
}

export function useSlider(
  initialState: number,
  maximumValue = 1.0,
  minimumValue = 0.0
) {
  const [value, setValue] = useState(initialState);
  return {
    value,
    onValueChange: (value: number) => {
      setValue(value);
    },
    minimumValue,
    maximumValue
  };
}

export function useInput(initialState?: string | undefined) {
  const [value, setValue] = useState<string | undefined>(initialState);
  return {
    onChangeText: setValue,
    value
  };
}
