import React, { FC, ChangeEvent } from 'react';
import styled from 'styled-components';
import iconCheck from '@/assets/images/icon-check.svg';

interface RadioProps {
  value: string | number;
  name: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Radio: FC<RadioProps> = ({ children, value, name, defaultChecked = false, disabled = false, onChange }) => {
  return (
    <Label>
      <RadioInput
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
      />
      {children}
    </Label>
  );
};

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-right: 4rem;
  font-weight: 600;
  cursor: pointer;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 2rem;
  height: 2rem;
  border: var(--border-gray);
  background-color: var(--color-white);
  border-radius: 50%;
  cursor: pointer;

  &:checked {
    background: var(--color-primary) url(${iconCheck}) no-repeat center / contain;
    border-color: var(--color-primary);
  }
`;

export default Radio;