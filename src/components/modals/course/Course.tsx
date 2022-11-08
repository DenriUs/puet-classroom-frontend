import { Button, Input, Modal, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './Course.scss';

import { useAppDispatch } from '../../../hooks/reduxhooks';
import { group } from './constants';
import { courseSchema } from './schemas';
import { CourseSchemaType } from './type';
import { SagaAction } from '../../../common/types';
import { showSuccessMessage } from '../../../common/helpers';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const CourseModal = (props: IProps) => {
  const { onStart, handleClose } = props;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(courseSchema),
  });

  const dispatch = useAppDispatch();

  const handleCourseSubmit = (data: CourseSchemaType) => {
    dispatch({ type: SagaAction.COURSES_CREATE, payload: data });
    handleClose();
    showSuccessMessage('Курс успішно додано!');
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={530}>
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
                name='group'
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
                    placeholder='Введіть назву групи'
                    filterOption={(input: string, option: any) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={group}
                  />
                )}
              />
            </label>
            {errors.group && <p className='form-error-label'>{errors.group.message}</p>}
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
