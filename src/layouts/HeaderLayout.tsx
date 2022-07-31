import React, { ReactNode } from 'react';
import Header from '../components/Header';

interface Props {
  children?: ReactNode;
}

const HeaderLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderLayout;
