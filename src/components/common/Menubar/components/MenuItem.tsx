import React from 'react';
import * as S from './styled';
import { MenuItemActiveType } from '../../../../types';

const MenuItem = ({ isActive, onClick, children }: MenuItemActiveType) => {
  return (
    <S.MenuItem isActive={isActive} onClick={onClick}>
      {children}
    </S.MenuItem>
  );
};

export default MenuItem;
