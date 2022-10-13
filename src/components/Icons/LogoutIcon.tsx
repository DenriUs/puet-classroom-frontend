import Icon from '@ant-design/icons';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { useMemo } from 'react';

import icon from '../../global/images/icons/logout.svg';

const LogoutIcon = (props: IconComponentProps) => {
  const { onClick } = props;
  const image = useMemo(() => <img src={icon} alt='icon' />, []);
  return <Icon component={() => image} onClick={onClick} />;
};

export default LogoutIcon;
