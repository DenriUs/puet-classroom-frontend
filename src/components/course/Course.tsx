import { UserOutlined } from '@ant-design/icons';
import { Progress } from 'antd';

import './Course.scss';
import hatIcon from '../../global/images/icons/hat.svg';
import { CourseEntity } from '../../common/types';
import { getTeacherShortName } from '../../common/helpers';

interface Props {
  data: CourseEntity;
  onClick: () => void;
}

const Course = (props: Props) => {
  const {
    onClick,
    data: { name, teacher },
  } = props;

  return (
    <div className='course-card__container' onClick={onClick}>
      <img src={hatIcon} className='icon-study' alt='icon' />
      <span className='title'>{name}</span>
      <div className='decription'>
        <span className='decription__icon'>
          <UserOutlined />
        </span>
        <span className='decription__name'>{getTeacherShortName(teacher)}</span>
      </div>
      <div className='progress-container'>
        <Progress
          strokeColor='rgba(219, 69, 46, 0.49)'
          trailColor='rgba(255, 255, 255, 0.54)'
          type='circle'
          percent={40}
        />
      </div>
    </div>
  );
};

export default Course;
