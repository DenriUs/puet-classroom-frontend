import { Layout } from 'antd';
import { PropsWithChildren } from 'react';

import 'antd/dist/antd.css';
import './Layout.scss';

import Sidebar from '../../components/sidebar/Sidebar';

interface Props {}

const LayoutPage = (props: PropsWithChildren<Props>) => {
  const { children } = props;

  return (
    <Layout>
      <Sidebar />
      {children}
    </Layout>
  );
};

export default LayoutPage;
