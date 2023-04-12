import { Button, Input, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import './Topic.scss';

import { useAppDispatch } from '../../../hooks/reduxhooks';
import { topicSchema } from './schemas';
import { TopicSchemaType } from './type';
import { SagaAction } from '../../../common/types';

interface IProps {
  id: string | undefined;
  onStart: boolean;
  name: string;
  type: SagaAction;
  topicName?: string;
  handleClose: () => void;
}

const TopicModal = (props: IProps) => {
  const { onStart, handleClose, name, type, topicName, id } = props;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<TopicSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(topicSchema),
  });

  useEffect(() => {
    reset({
      title: topicName,
    });
  }, [reset, topicName]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const dispatch = useAppDispatch();

  const handleTopicSubmit = async (data: TopicSchemaType): Promise<void> => {
    await dispatch({ type, payload: { id, ...data } });
    handleClose();
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={530}>
      <div className='topic-modal'>
        <div className='topic-modal__title-container'>{name} тему</div>
        <form className='topic-modal__form-container' onSubmit={handleSubmit(handleTopicSubmit)}>
          <div className='topic-modal__input-container'>
            <label htmlFor='title'>
              Назва теми
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
          <div className='topic-modal__button-container'>
            <Button
              shape='round'
              type='primary'
              htmlType='submit'
              className='topic-modal__button button'
            >
              {name}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TopicModal;
