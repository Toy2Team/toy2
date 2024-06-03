import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'date';
  value: string | number;
  label?: string;
  name?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
  min?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  errorMessage,
  disabled,
  readOnly,
  min,
  onChange,
  required,
}) => {
  return (
    <InputBox>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        id={name}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        min={min}
        onClick={(e) => e.currentTarget.focus()}
      />
      {error && <ErrorText>{errorMessage}</ErrorText>}
    </InputBox>
  );
};

const InputBox = styled.div`
  margin-bottom: 6rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1.2rem;
  font-weight: 500;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 5rem;
  padding: 0 1.5rem;
  color: var(--color-black);
  border-radius: 6px;
  border: var(--border-gray);
  background-color: var(--color-white);

  &::placeholder {
    color: var(--color-gray-light);
  }

  &:focus {
    border: var(--border-primary);
  }

  &:read-only {
    border: var(--border-gray);
  }
`;

const ErrorText = styled.p`
  .ErrorText {
    color: var(--chip-red);
    font-size: 1.4rem;
    margin-top: 0.06rem;
    margin-left: 1rem;
  }
`;

export default FormInput;
