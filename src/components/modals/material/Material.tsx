import { Button, Input, Modal, Radio, RadioChangeEvent } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';

import './Material.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { materialSchema } from './schemas';
import { MaterialSchemaType } from './type';
import { CourseActivityTypeEnum, SagaAction } from '../../../common/types';
import { materialOptions } from './contants';

interface IProps {
  id: string | undefined;
  name: string;
  type: SagaAction;
  onStart: boolean;
  materialName?: string;
  createMode?: boolean;
  handleClose: () => void;
}

const MaterialModal = (props: IProps) => {
  const { onStart, handleClose, id, name, type, materialName, createMode } = props;
  const [typeActivity, setType] = useState(CourseActivityTypeEnum.LECTURE);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<MaterialSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      type: CourseActivityTypeEnum.LECTURE,
    },
    resolver: zodResolver(materialSchema),
  });

  const dispatch = useAppDispatch();

  const handleMaterialSubmit = (data: MaterialSchemaType) => {
    dispatch({
      type,
      payload: { id, ...data },
    });
    handleClose();
  };

  useEffect(() => {
    reset({
      title: materialName,
      type: typeActivity,
    });
  }, [materialName]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={630}>
      <div className='course-modal'>
        <div className='course-modal__title-container'>{name} матеріал</div>
        <form
          className='course-modal__form-container'
          onSubmit={handleSubmit(handleMaterialSubmit)}
        >
          {createMode && (
            <div className='course-modal__radio-container'>
              <label htmlFor='type'>
                <Controller
                  control={control}
                  name='type'
                  render={({ field }) => (
                    <Radio.Group
                      options={materialOptions}
                      onChange={({ target: { value } }: RadioChangeEvent) => {
                        setType(value);
                        reset({
                          type: value,
                        });
                        field.onChange(value);
                      }}
                      optionType='button'
                      defaultValue={typeActivity}
                    />
                  )}
                />
              </label>
            </div>
          )}
          <div className='course-modal__input-container'>
            <label htmlFor='title'>
              Назва
              <Controller
                control={control}
                name='title'
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
            {errors.title && <p className='form-error-label'>{errors.title.message}</p>}
          </div>
          <div className='course-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='course-modal__button button'
            >
              {name}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MaterialModal;
