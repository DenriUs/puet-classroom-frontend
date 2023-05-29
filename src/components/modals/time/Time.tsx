import { Button, Modal, Select, TimePicker } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import './Time.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { timeSchema } from './schemas';
import { TimeSchemaType } from './type';
import { dayOptions } from './constants';
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
    formState: { errors, isSubmitting, isSubmitSuccessful },
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
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={530}>
      <div className='topic-modal'>
        <div className='topic-modal__title-container'>Додати день</div>
        <form className='topic-modal__form-container' onSubmit={handleSubmit(handleTopicSubmit)}>
          <div className='topic-modal__input-container'>
            <label htmlFor='weekday'>
              День
              <Controller
                control={control}
                name='weekday'
                render={({ field: { onBlur, onChange, value } }) => (
                  <Select
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    disabled={isSubmitting}
                    showSearch
                    optionFilterProp='children'
                    size='large'
                    className='group-modal__select'
                    placeholder='Виберіть день'
                    options={dayOptions}
                  />
                )}
              />
            </label>
            {errors.weekday && <p className='form-error-label'>{errors.weekday.message}</p>}
          </div>
          <div className='time__picker-container'>
            <div className='topic-modal__input-container'>
              <label htmlFor='startTime'>
                Час початку пари
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
                Час закінчення пари
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
