import { Button } from 'antd';
import { PlayCircleOutlined, CaretDownOutlined } from '@ant-design/icons';
import profileIcon from '../../../public/profileIcon.png';
import diplomaImg from '../../../public/diploma.png';
import './CourseHeader.scss';

interface Props {}

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
          <CaretDownOutlined className="icon" />
        </span>
      </div>
      <div className="box-course__button-group">
        <Button shape="round" icon={<PlayCircleOutlined className="icon" />} className="button">
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
