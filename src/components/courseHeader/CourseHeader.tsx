import { Button, Dropdown, Menu } from 'antd';
import { PlayCircleOutlined, CaretDownOutlined } from '@ant-design/icons';
import profileIcon from '../../../public/profileIcon.png';
import diplomaImg from '../../../public/diploma.png';
import './CourseHeader.scss';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

interface Props {}

const menu = (
  <Menu
    items={[
      {
        label: '+38099888239',
        key: '1',
        icon: <PhoneOutlined />,
      },
      {
        label: 'den.tacii@gmail.com',
        key: '2',
        icon: <MailOutlined />,
      },
    ]}
  />
);

const CourseHeader = (props: Props) => {
  return (
    <div className="box-course">
      <div className="box-course__name">
        <span>Хімія</span>
      </div>
      <div className="box-course__author">
        <img src={profileIcon} className="image-author" alt="name" />
        <span className="name">
          Ємець Олег Олексійович
          <Dropdown overlay={menu} placement="bottomLeft" className="drop-down">
            <CaretDownOutlined className="icon" />
          </Dropdown>
        </span>
      </div>
      <div>
        <Button
          shape="round"
          icon={<PlayCircleOutlined className="icon" />}
          className="button-connect"
        >
          Приєднатися
        </Button>
      </div>
      <div className="box-course__design">
        <img src={diplomaImg} alt="name" className="image" />
      </div>
    </div>
  );
};

export default CourseHeader;
