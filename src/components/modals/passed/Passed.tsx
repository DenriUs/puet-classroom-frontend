import { Modal, UploadFile, UploadProps, Button } from 'antd';
import { Dispatch, SetStateAction, useRef, useState, useEffect } from 'react';

import './Passed.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { CoursePassedAssignmentEntity, SagaAction } from '../../../common/types';
import FileUpload from '../../fileUpload/FileUpload';
import { showConfirm } from '../../../common/helpers';

interface IProps {
  onStart: boolean;
  data: CoursePassedAssignmentEntity | undefined;
  handleClose: () => void;
}

const PassedModal = (props: IProps) => {
  const { courseActivity } = useAppSelector((state) => state.coursesReducer);

  const uploadRef = useRef<{ setFileList: Dispatch<SetStateAction<UploadFile<any>[]>> }>(null);

  const { data, onStart, handleClose } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const dispatch = useAppDispatch();

  const clearFileList = () => {
    setFileList([]);
    uploadRef.current && uploadRef.current.setFileList([]);
  };

  const handleFileUpload = () => {
    dispatch({
      type: SagaAction.COURSES_PASSED_ASSIGNMENT_CREATE,
      payload: {
        id: courseActivity?.id,
        file: fileList[0]?.originFileObj,
        fileId: data?.file.id,
      },
    });
    handleClose();
  };

  const handlePassedDelete = () => {
    dispatch({
      type: SagaAction.COURSES_PASSED_ASSIGNMENT_DELETE,
      payload: data?.id,
    });
    clearFileList();
    handleClose();
  };

  const onDraggerChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList[0]) newFileList[0].status = 'done';
    setFileList(newFileList);
  };

  useEffect(() => {
    clearFileList();
  }, [courseActivity]);

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={700}>
      <div className='passed-modal'>
        <div className='passed-modal__title'>{courseActivity?.title}</div>
        <div className='passed-modal__dragger'>
          <FileUpload
            id={data?.file.id as string}
            name={data?.file.filename as string}
            url={data?.file.src as string}
            accept={'image/*,.pdf,.doc,.docx,'}
            onChange={onDraggerChange}
            ref={uploadRef}
          />
        </div>
        <div className='passed-modal__button-container'>
          {!data ? (
            <Button
              type='primary'
              shape='round'
              onClick={handleFileUpload}
              className='passed-modal__button'
            >
              Відправити
            </Button>
          ) : (
            <Button
              type='primary'
              shape='round'
              onClick={() => showConfirm('видалити здану роботу', handlePassedDelete)}
              className='passed-modal__button'
            >
              Видалити роботу
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PassedModal;
