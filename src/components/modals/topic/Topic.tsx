import { Button, Input, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import './Topic.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { topicSchema } from './schemas';
import { TopicSchemaType } from './type';
import { SagaAction, TopicEntity } from '../../../common/types';

interface IProps {
  onStart: boolean;
  title: string;
  type: SagaAction;
  handleClose: () => void;
}

const TopicModal = (props: IProps) => {
  const { onStart, handleClose, title, type } = props;
  const { course } = useAppSelector((state) => state.coursesReducer);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TopicSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(topicSchema),
  });

  const id = course?.id;

  const dispatch = useAppDispatch();

  const handleTopicSubmit = (data: TopicSchemaType) => {
    dispatch({ type, payload: { id, ...data } });
    handleClose();
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={530}>
      <div className='topic-modal'>
        <div className='topic-modal__title-container'>{title}</div>
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
              Додати
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TopicModal;
