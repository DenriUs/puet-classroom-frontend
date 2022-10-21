import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import './AppLoader.scss';

const AppLoader = () => (
  <Spin className='spinner' indicator={<LoadingOutlined className='loader' />} />
);

export default AppLoader;
