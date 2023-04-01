import { Button, Input, Modal, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { courseSchema } from './schemas';
import { CourseSchemaType } from './type';
import { SagaAction } from '../../../common/types';

import './Course.scss';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const CourseModal = (props: IProps) => {
  const { onStart, handleClose } = props;
  const { groups } = useAppSelector((state) => state.groupsReducer);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<CourseSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(courseSchema),
  });

  const dispatch = useAppDispatch();

  const handleCourseSubmit = (data: CourseSchemaType) => {
    dispatch({ type: SagaAction.COURSE_CREATE, payload: data });
    handleClose();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={630}>
      <div className='course-modal'>
        <div className='course-modal__title-container'>Додати курс</div>
        <form className='course-modal__form-container' onSubmit={handleSubmit(handleCourseSubmit)}>
          <div className='course-modal__input-container'>
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
                    disabled={isSubmitting}
                  />
                )}
              />
            </label>
            {errors.name && <p className='form-error-label'>{errors.name.message}</p>}
          </div>
          <div className='course-modal__select-container'>
            <label htmlFor='group'>
              <Controller
                control={control}
                name='groupId'
                render={({ field: { onBlur, onChange, value } }) => (
                  <Select
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    disabled={isSubmitting}
                    showSearch
                    optionFilterProp='children'
                    size='large'
                    className='course-modal__select'
                    placeholder='Виберіть групу'
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={(groups || []).map((group) => ({
                      value: group.id,
                      label: group.name,
                    }))}
                    onDropdownVisibleChange={() => {
                      dispatch({ type: SagaAction.GROUPS_GET });
                    }}
                  />
                )}
              />
            </label>
            {errors.groupId && <p className='form-error-label'>{errors.groupId.message}</p>}
          </div>
          <div className='course-modal__area-container'>
            <label htmlFor='description'>
              <Controller
                control={control}
                name='description'
                render={({ field: { onBlur, onChange, value } }) => (
                  <TextArea
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    disabled={isSubmitting}
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
          <div className='course-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='course-modal__button button'
            >
              Створити
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseModal;
