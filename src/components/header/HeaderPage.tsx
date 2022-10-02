import './HeaderPage.scss';
import { Layout } from 'antd';
import profileIcon from '../../../public/profileIcon.png';
import { CaretDownOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderPage = () => {
  return (
    <Header className="header">
      <div className="wrapper">
        <div className="wrapper__name">
          <span>Ласкаво просимо, Денис</span>
        </div>
        <div className="items">
          <div className="items__image">
            <img src={profileIcon} alt="icon" />
          </div>
          <div className="items__name">
            <span>Денис Тацій</span>
          </div>
          <div className="items__icon">
            <CaretDownOutlined />
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderPage;
