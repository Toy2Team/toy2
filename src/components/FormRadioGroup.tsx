import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface RadioGroupProps {
  label: string;
  children: ReactNode;
}

const FormRadioGroup: FC<RadioGroupProps> = ({ label, children }) => {
  return (
    <FieldsetLayout>
      <LegendLayout>{label}</LegendLayout>
      {children}
    </FieldsetLayout>
  );
};

export default FormRadioGroup;

const FieldsetLayout = styled.fieldset`
  border: none;
  margin-bottom: 6rem;
`;

const LegendLayout = styled.legend`
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
`;
