import './CardLecture.scss';
import { ExclamationCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { CourseActivityEntity, SagaAction, UserRoleEnum } from '../../common/types';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { showDeleteConfirm, showSuccessMessage } from '../../common/helpers';

interface Props {
  data: CourseActivityEntity;
}

const CardLecture = (props: Props) => {
  const {
    data: { id, title },
  } = props;

  const { user } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();

  const handleLectureDelete = () => {
    dispatch({ type: SagaAction.COURSES_TOPICS_ACTIVITY_DELETE, payload: id });
    showSuccessMessage('Лекцію видалено з курсу!');
  };

  return (
    <div className='box'>
      <div className='box-card'>
        <div className='box-card__title-container'>
          <div className='box-card__title-lecture'>{title}</div>
          {user?.role == UserRoleEnum.TEACHER && (
            <div className='box-card__delete-button'>
              <DeleteOutlined
                className='file-icon'
                onClick={() => showDeleteConfirm('лекцію', handleLectureDelete)}
              />
            </div>
          )}
        </div>
        <div className='box-card__file'>
          <div className='name-file'>Базові поняття інформаційних мереж.pptx</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
        <div className='box-card__file'>
          <div className='name-file'>Базові поняття інформаційних мереж.pptx</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
        <div className='box-card__file'>
          <div className='name-file'>Базові поняття інформаційних мереж.pptx</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
        <div className='box-card__file'>
          <div className='name-file'>Базові поняття інформаційних мереж.pptx</div>
          <div className='icon-file'>
            <FilePdfOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLecture;
