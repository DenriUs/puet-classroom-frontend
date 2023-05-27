import { useEffect } from 'react';
import { Button, Input, Modal, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { studentSchema } from './schemas';
import { StudentSchemaType } from './type';
import { SagaAction, UserEntity, UserRoleEnum, filterOption, filterSort } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';

import './Student.scss';

interface IProps extends Partial<UserEntity> {
  groupId?: string;
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
    groupId,
  } = props;
  const { groups } = useAppSelector((state) => state.groupsReducer);
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
    dispatch({ type: SagaAction.STUDENTS_GET });
  }, [dispatch]);

  useEffect(() => {
    reset({
      firstName,
      lastName,
      middleName,
      email,
      phoneNumber,
      groupId,
    });
  }, [reset, firstName, lastName, middleName, email, phoneNumber, groupId]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
            {errors.phoneNumber && <p className='form-error-label'>{errors.phoneNumber.message}</p>}
          </div>
          <div className='student-modal__select-container'>
            <label htmlFor='groupId'>
              Група
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
                    className='group-modal__select'
                    placeholder='Виберіть групу'
                    filterOption={(input, option) => filterOption(input, option)}
                    filterSort={(optionA, optionB) => filterSort(optionA, optionB)}
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
