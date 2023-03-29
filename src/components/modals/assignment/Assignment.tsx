import { Button, InputNumber, Modal } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileTextOutlined, FileExclamationOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import './Assignment.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { assignmentSchema } from './schemas';
import { AssignmentSchemaType } from './type';
import { SagaAction } from '../../../common/types';
import { getUserFullName, getUserIcon } from '../../../common/helpers';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const AssignmentModal = (props: IProps) => {
  const { onStart, handleClose } = props;
  const { coursePassedAssignment, courseActivity } = useAppSelector(
    (state) => state.coursesReducer,
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AssignmentSchemaType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      mark: coursePassedAssignment?.mark,
    },
  });

  const dispatch = useAppDispatch();

  const handleAssignmentSubmit = (data: AssignmentSchemaType) => {
    dispatch({
      type: SagaAction.COURSES_PASSED_ASSIGNMENT_UPDATE,
      payload: { id: coursePassedAssignment?.id, ...data },
    });
    handleClose();
  };

  useEffect(() => {
    reset({
      mark: coursePassedAssignment?.mark,
    });
  }, [coursePassedAssignment]);

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={650}>
      <div className='assignment-modal__container'>
        <div className='assignment-modal__title-container'>
          <h1 className='assignment-modal__title'>{courseActivity?.title}</h1>
        </div>
        <div className='assignment-modal__content-container'>
          <div className='assignment-modal__info-container'>
            {getUserIcon(coursePassedAssignment?.participant?.user)}
            <span className='assignment-modal__owner-title'>
              {getUserFullName(coursePassedAssignment?.participant?.user)}
            </span>
          </div>
          <div className='assignment-modal__info-container'>
            <span className='assignment-modal__file-title'>Файл: </span>
            <a
              className='assignment-modal__file-icon'
              href={coursePassedAssignment?.file.src}
              download
            >
              {!coursePassedAssignment?.file.src ? (
                <FileExclamationOutlined className='assignment-modal__file-icon-error' />
              ) : (
                <FileTextOutlined />
              )}
            </a>
          </div>
          <div className='assignment-modal__info-container'>
            <span className='assignment-modal__file-title'>Статус оцінювання роботи:</span>
            <span className='assignment-modal__status-title'>
              {!coursePassedAssignment?.mark ? 'Здано' : 'Оцінено'}
            </span>
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
