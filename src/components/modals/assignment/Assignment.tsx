import { Avatar, Button, InputNumber, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import './Assignment.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { assignmentSchema } from './schemas';
import { AssignmentSchemaType } from './type';
import { SagaAction } from '../../../common/types';
import { getUserFullName } from '../../../common/helpers';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const AssignmentModal = (props: IProps) => {
  const { onStart, handleClose } = props;
  const { courseActivity, coursePassedAssignment } = useAppSelector(
    (state) => state.coursesReducer,
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<AssignmentSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(assignmentSchema),
    defaultValues: coursePassedAssignment,
  });

  const id = courseActivity?.id;

  const dispatch = useAppDispatch();

  const handleAssignmentSubmit = async (data: AssignmentSchemaType): Promise<void> => {
    await dispatch({ type: SagaAction.COURSES_PASSED_ASSIGNMENT_UPDATE, payload: { id, ...data } });
    handleClose();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={800}>
      <div className='assignment-modal__container'>
        <div className='assignment-modal__title-container'>
          <h1 className='assignment-modal__title'>{courseActivity?.title}</h1>
        </div>
        <div className='assignment-modal__content-container'>
          <div className='assignment-modal__info-container'>
            <Avatar icon={<UserOutlined />} size={45}></Avatar>
            <span className='assignment-modal__owner-title'>Комар Ілля Ігорович</span>
          </div>
          <div className='assignment-modal__info-container'>
            <span className='assignment-modal__file-title'>Файл: </span>
            <a
              className='assignment-modal__file-icon'
              href={coursePassedAssignment?.file.src}
              download
            >
              <FileTextOutlined />
            </a>
          </div>
          <div className='assignment-modal__info-container'>
            <span className='assignment-modal__file-title'>Статус оцінювання роботи:</span>
            <span className='assignment-modal__status-title'>Надіслано</span>
          </div>
          <form
            className='assignment-modal__form-container'
            onSubmit={handleSubmit(handleAssignmentSubmit)}
          >
            <div className='assignment-modal__input-container'>
              <span className='assignment-modal__file-title'>Оцінка:</span>
              <Controller
                control={control}
                name='mark'
                render={({ field: { onBlur, onChange, value } }) => (
                  <InputNumber
                    addonAfter='/100'
                    step={10}
                    min={1}
                    max={100}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    disabled={isSubmitting}
                    className='assignment-modal__input-number'
                  />
                )}
              />
            </div>
            {errors.mark && <p className='form-error-label'>{errors.mark.message}</p>}
            <div className='assignment-modal__button-container'>
              <Button
                shape='round'
                type='primary'
                htmlType='submit'
                className='topic-modal__button button'
              >
                Опублікувати
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AssignmentModal;
