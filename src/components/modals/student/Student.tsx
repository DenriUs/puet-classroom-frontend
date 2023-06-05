import { useEffect } from 'react';
import { Button, Input, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMask from 'react-input-mask';

import { studentSchema } from './schemas';
import { StudentSchemaType } from './type';
import { SagaAction, UserEntity, UserRoleEnum } from '../../../common';
import { useAppDispatch } from '../../../hooks/reduxhooks';

import './Student.scss';

interface IProps extends Partial<UserEntity> {
  actionName: string;
  sagaActionType: SagaAction;
  onStart: boolean;
  handleClose: () => void;
}

const StudentModal = (props: IProps) => {
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
  } = useForm<StudentSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(studentSchema),
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.GROUPS_GET });
  }, [dispatch]);

  useEffect(() => {
    reset({
      firstName,
      lastName,
      middleName,
      email,
      phoneNumber,
    });
  }, [reset, firstName, lastName, middleName, email, phoneNumber]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handlePasswordClick = () => {
    dispatch({ type: SagaAction.STUDENT_PASSWORD_UPDATE, payload: id });
  };

  const handleUserSubmit = async (data: StudentSchemaType): Promise<void> => {
    dispatch({ type: sagaActionType, payload: { id, ...data, role: UserRoleEnum.STUDENT } });
    handleClose();
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={630}>
      <div className='student-modal'>
        <div className='student-modal__title-container'>{actionName} студента</div>
        <form className='student-modal__form-container' onSubmit={handleSubmit(handleUserSubmit)}>
          <div className='student-modal__input-container'>
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
          <div className='student-modal__input-container'>
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
          <div className='student-modal__input-container'>
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
          <div className='student-modal__input-container'>
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
          <div className='student-modal__input-container'>
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
          {sagaActionType === SagaAction.STUDENT_UPDATE && (
            <div className='password-button__container'>
              <Button
                type='text'
                shape='round'
                className='password-button'
                onClick={handlePasswordClick}
              >
                Згенерувати новий пароль
              </Button>
            </div>
          )}
          <div className='student-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='student-modal__button button'
            >
              {actionName}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default StudentModal;
