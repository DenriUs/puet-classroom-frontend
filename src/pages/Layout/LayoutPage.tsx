import { Layout } from 'antd';
const { Content } = Layout;
import 'antd/dist/antd.css';
import './LayoutPage.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import HeaderPage from '../../components/header/HeaderPage';
import Schedule from '../../components/schedule/Schedule';

const LayoutPage = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <HeaderPage />
        <Content className="content">
          <Schedule />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
