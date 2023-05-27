import { useEffect } from 'react';
import { Button, Input, Modal, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { groupSchema } from './schemas';
import { GroupSchemaType } from './type';
import { GroupEntity, SagaAction, filterOption, filterSort } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';

import './Group.scss';
import { coursesAmount } from '../../../pages/Groups/constants';

interface IProps extends Partial<GroupEntity> {
  specialityId?: string;
  actionName: string;
  sagaActionType: SagaAction;
  onStart: boolean;
  handleClose: () => void;
}

const GroupModal = (props: IProps) => {
  const { onStart, handleClose, sagaActionType, actionName, id, name, courseNumber, specialityId } =
    props;
  const { specialities } = useAppSelector((state) => state.specialitiesReducer);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<GroupSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(groupSchema),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SagaAction.SPECIALITIES_GET });
  }, [dispatch]);

  useEffect(() => {
    reset({
      name,
      courseNumber,
      specialityId,
    });
  }, [reset, name, courseNumber, specialityId]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleSpecialitySubmit = async (data: GroupSchemaType): Promise<void> => {
    dispatch({ type: sagaActionType, payload: { id, ...data } });
    handleClose();
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={630}>
      <div className='group-modal'>
        <div className='group-modal__title-container'>{actionName} групу</div>
        <form
          className='group-modal__form-container'
          onSubmit={handleSubmit(handleSpecialitySubmit)}
        >
          <div className='group-modal__input-container'>
            <label htmlFor='name'>
              Назва групи
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
          <div className='group-modal__select-container'>
            <label htmlFor='courseNumber'>
              Номер курсу
              <Controller
                control={control}
                name='courseNumber'
                render={({ field: { onBlur, onChange, value } }) => (
                  <Select
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    disabled={isSubmitting}
                    size='large'
                    className='group-modal__select'
                    placeholder='Виберіть номер курсу'
                    options={Array.from(Array(coursesAmount).keys(), (_, i) =>
                      (i + 1).toString(),
                    ).map((courseNumber) => ({
                      value: courseNumber,
                      label: courseNumber,
                    }))}
                  />
                )}
              />
            </label>
            {errors.courseNumber && (
              <p className='form-error-label'>{errors.courseNumber.message}</p>
            )}
          </div>
          <div className='group-modal__select-container'>
            <label htmlFor='specialityId'>
              Спеціальність
              <Controller
                control={control}
                name='specialityId'
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
                    placeholder='Виберіть спеціальність'
                    filterOption={(input, option) => filterOption(input, option)}
                    filterSort={(optionA, optionB) => filterSort(optionA, optionB)}
                    options={(specialities || []).map((speciality) => ({
                      value: speciality.id,
                      label: speciality.name,
                    }))}
                    onDropdownVisibleChange={() => {
                      dispatch({ type: SagaAction.SPECIALITIES_GET });
                    }}
                  />
                )}
              />
            </label>
            {errors.specialityId && (
              <p className='form-error-label'>{errors.specialityId.message}</p>
            )}
          </div>
          <div className='group-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='group-modal__button button'
            >
              {actionName}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default GroupModal;
