import React from 'react';
import AuthWindow from './AuthWindow';
import HeaderLayout from '../layouts/HeaderLayout';

function Authentication() {
  return (
    <>
      <HeaderLayout>
        <AuthWindow />
      </HeaderLayout>
    </>
  );
}

export default Authentication;
