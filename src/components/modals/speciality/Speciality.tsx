import { useEffect } from 'react';
import { Button, Input, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { specialitySchema } from './schemas';
import { SpecialitySchemaType } from './type';
import { SagaAction, SpecialityEntity } from '../../../common';
import { useAppDispatch } from '../../../hooks/reduxhooks';

import './Speciality.scss';

interface IProps extends Partial<SpecialityEntity> {
  actionName: string;
  sagaActionType: SagaAction;
  onStart: boolean;
  handleClose: () => void;
}

const SpecialityModal = (props: IProps) => {
  const { onStart, handleClose, sagaActionType, actionName, id, name } = props;
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<SpecialitySchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(specialitySchema),
  });

  useEffect(() => {
    reset({
      name,
    });
    console.log(name);
  }, [reset, name]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const dispatch = useAppDispatch();

  const handleSpecialitySubmit = async (data: SpecialitySchemaType): Promise<void> => {
    dispatch({ type: sagaActionType, payload: { id, ...data } });
    handleClose();
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={630}>
      <div className='course-modal'>
        <div className='course-modal__title-container'>{actionName} спеціальність</div>
        <form
          className='course-modal__form-container'
          onSubmit={handleSubmit(handleSpecialitySubmit)}
        >
          <div className='course-modal__input-container'>
            <label htmlFor='name'>
              Назва спеціальності
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
          <div className='course-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='course-modal__button button'
            >
              {actionName}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SpecialityModal;
