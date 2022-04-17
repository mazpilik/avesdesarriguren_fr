import React, { FC } from 'react';

import { Card } from 'primereact/card';

interface IAdminCard {
  title?: string;
  subTitle?: string;
  className?: string;
}

export const AdminCard: FC<IAdminCard> = ({
  title, subTitle, className, children,
}) => (
  <Card className={className} title={title} subTitle={subTitle}>
    {children}
  </Card>
);

AdminCard.defaultProps = {
  title: '',
  subTitle: '',
  className: '',
};
