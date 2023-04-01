import { UserOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import { String2HexCodeColor } from 'string-to-hex-code-color';

import './Course.scss';
import hatIcon from '../../global/images/icons/hat.svg';
import test from '../../global/images/icons/Test.png';
import { CourseEntity, UserRoleEnum } from '../../common/types';
import { getUserShortName } from '../../common/helpers';
import { useAppSelector } from '../../hooks/reduxhooks';

interface Props {
  data: CourseEntity;
  onClick: () => void;
}

const colorCard = new String2HexCodeColor(0.75);
const colorProgress = new String2HexCodeColor(0.4);

const Course = (props: Props) => {
  const {
    onClick,
    data: { name, teacher, group, cover },
  } = props;

  const { user } = useAppSelector((state) => state.authReducer);

  return (
    <div
      className='course-card__container'
      style={{ backgroundColor: colorCard.stringToColor(name) }}
      onClick={onClick}
    >
      <img src={hatIcon} className='icon-study' alt='icon' />
      <span className='title'>{name}</span>
      <div className='decription'>
        <span className='decription__icon'>
          <UserOutlined />
        </span>
        <span className='decription__name'>
          {user?.role == UserRoleEnum.STUDENT ? getUserShortName(teacher) : group?.name}
        </span>
      </div>
      <div className='course-card__image-container'>
        {cover.src ? (
          <img src={cover.src} alt='name' className='course-card__image' />
        ) : (
          <img src={test} alt='test' className='course-card__image' />
        )}
      </div>
      {user?.role == UserRoleEnum.STUDENT && (
        <div className='course-card__progress-container'>
          <Progress
            type='line'
            strokeColor={colorProgress.stringToColor(name)}
            trailColor='rgba(255, 255, 255, 0.54)'
            percent={40}
          />
        </div>
      )}
    </div>
  );
};

export default Course;
