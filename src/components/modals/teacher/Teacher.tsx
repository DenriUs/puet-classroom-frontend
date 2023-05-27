import { useEffect } from 'react';
import { Button, Input, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from 'react-input-mask';

import { teacherSchema } from './schemas';
import { TeacherSchemaType } from './type';
import { SagaAction, UserEntity, UserRoleEnum } from '../../../common';
import { useAppDispatch } from '../../../hooks/reduxhooks';

import './Teacher.scss';

interface IProps extends Partial<UserEntity> {
  actionName: string;
  sagaActionType: SagaAction;
  onStart: boolean;
  handleClose: () => void;
}

const TeacherModal = (props: IProps) => {
  const {
    onStart,
    handleClose,
    sagaActionType,
    actionName,
    id,
    firstName,
    lastName,
    middleName,
    email,
    phoneNumber,
  } = props;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<TeacherSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(teacherSchema),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    reset({
      firstName,
      lastName,
      middleName,
      email,
      phoneNumber,
    });
    console.log(firstName, lastName, middleName, email, phoneNumber);
  }, [reset, firstName, lastName, middleName, email, phoneNumber]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleUserSubmit = async (data: TeacherSchemaType): Promise<void> => {
    dispatch({ type: sagaActionType, payload: { id, ...data, role: UserRoleEnum.TEACHER } });
    handleClose();
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={630}>
      <div className='teacher-modal'>
        <div className='teacher-modal__title-container'>{actionName} викладача</div>
        <form className='teacher-modal__form-container' onSubmit={handleSubmit(handleUserSubmit)}>
          <div className='teacher-modal__input-container'>
            <label htmlFor='firstName'>
              Ім'я
              <Controller
                control={control}
                name='firstName'
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
            {errors.firstName && <p className='form-error-label'>{errors.firstName.message}</p>}
          </div>
          <div className='teacher-modal__input-container'>
            <label htmlFor='lastName'>
              Прізвище
              <Controller
                control={control}
                name='lastName'
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
            {errors.lastName && <p className='form-error-label'>{errors.lastName.message}</p>}
          </div>
          <div className='teacher-modal__input-container'>
            <label htmlFor='middleName'>
              Ім'я по-батькові
              <Controller
                control={control}
                name='middleName'
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
            {errors.middleName && <p className='form-error-label'>{errors.middleName.message}</p>}
          </div>
          <div className='teacher-modal__input-container'>
            <label htmlFor='email'>
              Пошта
              <Controller
                control={control}
                name='email'
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
            {errors.email && <p className='form-error-label'>{errors.email.message}</p>}
          </div>
          <div className='teacher-modal__input-container'>
            <label htmlFor='phoneNumber'>
              Нормер телефону
              <Controller
                control={control}
                name='phoneNumber'
                render={({ field: { onBlur, onChange, value } }) => (
                  <InputMask
                    mask='+380 (99)-999-99-99'
                    placeholder='+380 (__)-___-__-__'
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    disabled={isSubmitting}
                  >
                    <Input size='large' disabled={isSubmitting} />
                  </InputMask>
                )}
              />
            </label>
            {errors.phoneNumber && <p className='form-error-label'>{errors.phoneNumber.message}</p>}
          </div>
          <div className='teacher-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='teacher-modal__button button'
            >
              {actionName}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TeacherModal;
