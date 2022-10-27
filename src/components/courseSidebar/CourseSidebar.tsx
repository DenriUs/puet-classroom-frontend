import { TopicEntity } from '../../common/types';
import './CourseSidebar.scss';

interface Props {
  data: TopicEntity;
}

const CourseSidebar = (props: Props) => {
  const {
    data: { title },
  } = props;

  return (
    <div className='course-sidebar'>
      <div className='course-sidebar__container'>
        <div className='course-sidebar__title'>{title}</div>
      </div>
    </div>
  );
};

export default CourseSidebar;
