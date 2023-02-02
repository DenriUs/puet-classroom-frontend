import { SagaAction, TopicEntity, UserRoleEnum } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { showDeleteConfirm, showSuccessMessage } from '../../common/helpers';
import { BookMarkIcon } from '../Icons/BookMarkIcon';
import Icon from '@ant-design/icons';

import './CourseSidebar.scss';

interface Props {
  data: TopicEntity;
  onClick: () => void;
}

const CourseSidebar = (props: Props) => {
  const {
    data: { id, title },
    onClick,
  } = props;

  const { user } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();

  const handleTopicDelete = () => {
    dispatch({ type: SagaAction.COURSES_TOPIC_DELETE, payload: id });
    showSuccessMessage('Тему видалено з курсу!');
  };

  return (
    <div className='course-sidebar' onClick={onClick}>
      <div className='course-sidebar__container'>
        <div className='course-sidebar__title'>
          <Icon component={BookMarkIcon} className='book-mark-icon' />
          {title}
        </div>
        {user?.role == UserRoleEnum.TEACHER && (
          <>
            <div className='course-sidebar__button'>
              <EditOutlined className='course-sidebar-icon' />
            </div>
            <div
              className='course-sidebar__button'
              onClick={() => showDeleteConfirm('тему', handleTopicDelete)}
            >
              <DeleteOutlined className='course-sidebar-icon' />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseSidebar;
