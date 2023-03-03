import { Button, Input, Upload } from 'antd';
import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { showConfirm } from '../../common/helpers';
import { SagaAction } from '../../common/types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import { CourseUpdateSchemaType } from '../modals/course';
import { courseUpdateSchema } from '../modals/course/schemas';

import './SettingsCourse.scss';

const SettingsCourse = () => {
  const { course } = useAppSelector((state) => state.coursesReducer);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseUpdateSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: course,
    resolver: zodResolver(courseUpdateSchema),
  });

  const id = course?.id;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCourseDelete = () => {
    dispatch({ type: SagaAction.COURSE_DELETE, payload: course?.id });
    navigate(`/main/courses`);
  };

  const handleCourseUpdate = (data: CourseUpdateSchemaType) => {
    dispatch({ type: SagaAction.COURSE_UPDATE, payload: { id, ...data } });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Upload</div>
    </div>
  );

  return (
    <div className='setting-course'>
      <div className='setting-course__title-container'>
        <span className='setting-course__title'>Налаштування</span>
      </div>
      <form onSubmit={handleSubmit(handleCourseUpdate)}>
        <div className='setting-course__edit-container'>
          <div>
            <div className='setting-course__input-container'>
              <label htmlFor='name'>
                Назва курсу
                <Controller
                  control={control}
                  name='name'
                  render={({ field: { onBlur, onChange, value } }) => (
                    <Input
                      size='large'
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      defaultValue={course?.name}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </label>
              {errors.name && <p className='form-error-label'>{errors.name.message}</p>}
            </div>
            <label htmlFor='description'>
              <Controller
                control={control}
                name='description'
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextArea
                    onBlur={onBlur}
                    onChange={onChange}
                    defaultValue={course?.name}
                    value={value}
                    className='course-modal__area'
                    placeholder='Опис курсу'
                    showCount
                    rows={3}
                    maxLength={360}
                  />
                )}
              />
            </label>
            {errors.description && <p className='form-error-label'>{errors.description.message}</p>}
          </div>
          <div className='setting-course__upload-container'>
            <label>Оформлення</label>
            <Upload
              name='avatar'
              listType='picture-card'
              className='setting-course__upload'
              showUploadList={false}
            >
              {uploadButton}
            </Upload>
          </div>
          <div>
            <Button
              className='setting-course__button-course'
              shape='circle'
              type='primary'
              danger
              icon={<DeleteOutlined className='button__icon' />}
              onClick={() => showConfirm('видалити курс', handleCourseDelete)}
            ></Button>
          </div>
          <div className='setting-course__button-container'>
            <Button
              htmlType='submit'
              type='primary'
              shape='round'
              className='button-create-activity'
            >
              Зберегти
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsCourse;
