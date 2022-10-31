import { TopicEntity } from '../../common/types';
import './CourseSidebar.scss';

interface Props {
  data: TopicEntity;
  onClick: () => void;
}

const CourseSidebar = (props: Props) => {
  const {
    data: { title },
    onClick,
  } = props;

  return (
    <div className='course-sidebar' onClick={onClick}>
      <div className='course-sidebar__container'>
        <div className='course-sidebar__title'>{title}</div>
      </div>
    </div>
  );
};

export default CourseSidebar;
