import { Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

import { showConfirm, showSuccessMessage } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';

import './SettingsCourse.scss';

const SettingsCourse = () => {
  const { course } = useAppSelector((state) => state.coursesReducer);

  console.log(course);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCourseDelete = () => {
    dispatch({ type: SagaAction.COURSE_DELETE, payload: course?.id });
    navigate(`/main/courses`);
    showSuccessMessage('Курс видалено!');
  };

  return (
    <div className='setting-course'>
      <div className='setting-course__title-container'>
        <span className='setting-course-title'>Налаштування</span>
        <Button
          className='setting-course__button-course'
          shape='circle'
          type='primary'
          danger
          onClick={() => showConfirm('видалити курс', handleCourseDelete)}
        >
          <DeleteOutlined className='button__icon' />
        </Button>
      </div>
      <div>
        <div className='setting-course__edit-container'>
          <label>Назва курсу</label>
          <Input className='setting-input-course' size='large' />
        </div>
        <div className='setting-course__button-container'>
          <Button type='primary' shape='round' className='button-create-activity'>
            Зберегти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsCourse;
