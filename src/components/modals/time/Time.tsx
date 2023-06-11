import { Button, DatePicker, Modal, Select, TimePicker } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import './Time.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { timeSchema } from './schemas';
import { TimeSchemaType } from './type';
import { SagaAction } from '../../../common';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const TimeModal = (props: IProps) => {
  const { onStart, handleClose } = props;

  const { course } = useAppSelector((state) => state.coursesReducer);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<TimeSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(timeSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const dispatch = useAppDispatch();

  const handleTopicSubmit = async (data: TimeSchemaType): Promise<void> => {
    dispatch({ type: SagaAction.COURSES_TIMETABLE_CREATE, payload: { id: course?.id, ...data } });
    handleClose();
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={350}>
      <div className='topic-modal'>
        <div className='topic-modal__title-container'>Додати день</div>
        <form className='time__form-container' onSubmit={handleSubmit(handleTopicSubmit)}>
          <div className='time__date-container'>
            <label className='time__name-date' htmlFor='date'>
              День
              <Controller
                control={control}
                name='date'
                render={({ field: { onBlur, onChange } }) => (
                  <DatePicker
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Виберіть день'
                    className='time__picker'
                  />
                )}
              />
            </label>
            {errors.date && <p className='form-error-label'>{errors.date.message}</p>}
          </div>

          <div className='topic-modal__input-container'>
            <label htmlFor='startTime'>
              Час початку
              <Controller
                control={control}
                name='startTime'
                render={({ field: { onBlur, onChange } }) => (
                  <TimePicker
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Виберіть час'
                    format='HH:mm'
                    className='time__picker'
                  />
                )}
              />
            </label>
            {errors.startTime && <p className='form-error-label'>{errors.startTime.message}</p>}
          </div>
          <div className='topic-modal__input-container'>
            <label htmlFor='endTime'>
              Час закінчення
              <Controller
                control={control}
                name='endTime'
                render={({ field: { onBlur, onChange } }) => (
                  <TimePicker
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Виберіть час'
                    format='HH:mm'
                    className='time__picker'
                  />
                )}
              />
            </label>
            {errors.endTime && <p className='form-error-label'>{errors.endTime.message}</p>}
          </div>

          <div className='topic-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='topic-modal__button button'
            >
              Додати
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TimeModal;
