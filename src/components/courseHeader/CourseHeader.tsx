import {
  PlayCircleOutlined,
  CaretDownOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { String2HexCodeColor } from 'string-to-hex-code-color';

import './CourseHeader.scss';

import profileIcon from '../../assets/profileIcon.png';
import diplomaImg from '../../assets/diploma.png';
import { CourseEntity } from '../../common/types';
import { getTeacherFullName } from '../../common/helpers';

interface Props {
  data: CourseEntity;
}

const colorCard = new String2HexCodeColor(0.5);

const CourseHeader = (props: Props) => {
  const {
    data: { name, teacher },
  } = props;

  const menu = (
    <Menu
      items={[
        {
          label: `${teacher.phoneNumber}`,
          key: '1',
          icon: <PhoneOutlined />,
        },
        {
          label: `${teacher.email}`,
          key: '2',
          icon: <MailOutlined />,
        },
      ]}
    />
  );

  return (
    <div className='course-header' style={{ backgroundColor: colorCard.stringToColor(name) }}>
      <div className='course-header__name-container'>
        <span className='textt'>{name}</span>
      </div>
      <div className='course-header__author-container'>
        <img src={profileIcon} className='image-author' alt='name' />
        <span className='name'>
          {getTeacherFullName(teacher)}
          <Dropdown overlay={menu} placement='bottomLeft' className='drop-down'>
            <CaretDownOutlined className='icon' />
          </Dropdown>
        </span>
      </div>
      <Button
        type='primary'
        shape='round'
        icon={<PlayCircleOutlined className='icon' />}
        className='course-header__button-connect'
      >
        Приєднатися
      </Button>
      <div className='course-header__design-container'>
        <img src={diplomaImg} alt='name' className='course-header__image' />
      </div>
    </div>
  );
};

export default CourseHeader;
