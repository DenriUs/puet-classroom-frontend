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
  topic: string | undefined;
  name: string;
  type: SagaAction;
  onStart: boolean;
  materialName?: string;
  handleClose: () => void;
}

const MaterialModal = (props: IProps) => {
  const { onStart, handleClose, topic, name, type, materialName } = props;
  const [typeActivity, setType] = useState(CourseActivityTypeEnum.LECTURE);

  console.log(typeActivity);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    resetField,
  } = useForm<MaterialSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      type: CourseActivityTypeEnum.LECTURE,
    },
    resolver: zodResolver(materialSchema),
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    reset({
      title: materialName,
    });
  }, [materialName]);

  const handleMaterialSubmit = (data: MaterialSchemaType) => {
    console.log(data);
    dispatch({
      type,
      payload: { topic, ...data },
    });
    resetField('type');
    handleClose();
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={630}>
      <div className='course-modal'>
        <div className='course-modal__title-container'>{name} матеріал</div>
        <form
          className='course-modal__form-container'
          onSubmit={handleSubmit(handleMaterialSubmit)}
        >
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
