import React, { useEffect, useState } from 'react';
import { ConfirmationButton, Container, Input } from './styles';

interface PromoCodeInputProps {
  name: string;
  onChange: (value: string) => void;
  disabled: boolean;
  value: string | undefined;
}

const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
  name,
  onChange,
  disabled,
  value
}) => {
  const [localValue, setLocalValue] = useState('');

  const handleApplyClick = () => {
    onChange(localValue);
  };

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  return (
    <Container>
      <Input
        placeholder="QWERTY"
        name={name}
        value={localValue}
        onIonInput={(e) => setLocalValue(e.detail.value || '')}
      />
      <ConfirmationButton
        type="button"
        onClick={handleApplyClick}
        disabled={disabled}
      >
        Apply
      </ConfirmationButton>
    </Container>
  );
};

export default PromoCodeInput;
