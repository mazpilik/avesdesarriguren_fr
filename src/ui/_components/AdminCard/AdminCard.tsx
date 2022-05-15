import React, { FC } from 'react';

import { AdminCardWrapper } from './AdminCard.styles';

interface IAdminCard {
  title?: string;
  subTitle?: string;
  className?: string;
  footer?: any;
}

export const AdminCard: FC<IAdminCard> = ({
  title, subTitle, className, children, footer,
}) => (
  <AdminCardWrapper className={className} title={title} subTitle={subTitle} footer={footer}>
    {children}
  </AdminCardWrapper>
);

AdminCard.defaultProps = {
  title: '',
  subTitle: '',
  className: '',
  footer: null,
};
