import { Layout } from 'antd';
import { PropsWithChildren } from 'react';

import './Layout.scss';

import Sidebar from '../../components/sidebar/Sidebar';
import { ScrollToTop } from '../ScrollToTop';

interface Props {}

const LayoutPage = (props: PropsWithChildren<Props>) => {
  const { children } = props;

  return (
    <Layout>
      <ScrollToTop />
      <Sidebar />
      {children}
    </Layout>
  );
};

export default LayoutPage;
