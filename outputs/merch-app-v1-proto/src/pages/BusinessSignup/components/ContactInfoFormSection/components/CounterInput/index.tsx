/* eslint-disable react/require-default-props */
import { InputChangeEventDetail } from '@ionic/core';
import React, { useEffect, useState } from 'react';
import {
  CounterButton,
  CounterContainer,
  Input,
  ParentContainer,
  TextLabel
} from './styles';

const useDebouncedValue: (
  value?: number
) => [number, number, (newValue: number) => void] = (value) => {
  const [instantValue, setInstantValue] = useState<number>(value || 1);
  const [debouncedValue, setDebouncedValue] = useState<number>(value || 1);

  const [valueSettingTimeout, setValueSettingTimeout] = useState<number>(0);

  const onValueChange = (newValue: number) => {
    setInstantValue(newValue);

    if (valueSettingTimeout) {
      clearTimeout(valueSettingTimeout);
    }

    const newTimeout = setTimeout(() => {
      setDebouncedValue(newValue);
    }, 700);

    setValueSettingTimeout(newTimeout as unknown as number);
  };

  return [debouncedValue, instantValue, onValueChange];
};

interface CounterInputProps {
  label: string;
  onChange: (value: number) => void;
  value?: number;
  name: string;
  min?: number;
  max?: number;
  error?: boolean;
  disabled?: boolean;
}

const CounterInput: React.FC<CounterInputProps> = ({
  label,
  onChange,
  value,
  name,
  min = 1,
  max = 50,
  error,
  disabled = false
}) => {
  const [debouncedValue, instantValue, setInstantValue] =
    useDebouncedValue(value);

  const moveOneUnit = (direction: -1 | 1) => () =>
    setInstantValue(instantValue + 1 * direction);

  const handleInputChange = (e: CustomEvent<InputChangeEventDetail>) => {
    const newValue = Number(e.detail.value);
    setInstantValue(newValue);
  };

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <ParentContainer>
      <TextLabel error={error}>{label}</TextLabel>
      <CounterContainer>
        <CounterButton
          type="button"
          disabled={instantValue <= min || disabled}
          onClick={moveOneUnit(-1)}
        >
          -
        </CounterButton>
        <Input
          name={name}
          placeholder={label}
          type="number"
          value={instantValue}
          min={`${min}`}
          max={`${max}`}
          onIonInput={handleInputChange}
          error={error}
          disabled={disabled}
        />
        <CounterButton
          type="button"
          disabled={instantValue >= max || disabled}
          onClick={moveOneUnit(1)}
        >
          +
        </CounterButton>
      </CounterContainer>
    </ParentContainer>
  );
};

export default CounterInput;
