import { Modal, UploadFile, UploadProps, Button } from 'antd';
import { useState } from 'react';

import './Passed.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxhooks';
import { SagaAction } from '../../../common/types';
import FileUpload from '../../fileUpload/FileUpload';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const PassedModal = (props: IProps) => {
  const { coursePassedAssignment } = useAppSelector((state) => state.coursesReducer);
  const { onStart, handleClose } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const dispatch = useAppDispatch();

  const handleFileUpload = () => {
    dispatch({
      type: SagaAction.FILE_UPLOAD,
      payload: { id: coursePassedAssignment?.file.id, file: fileList[0]?.originFileObj },
    });
    handleClose();
  };

  const onDraggerChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList[0]) newFileList[0].status = 'done';
    setFileList(newFileList);
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={700}>
      <div className='passed-modal'>
        <div className='passed-modal__title'>Завантажити файл</div>
        <div className='passed-modal__dragger'>
          <FileUpload onChange={onDraggerChange} />
        </div>
        <div className='passed-modal__button'>
          <Button
            type='primary'
            shape='round'
            onClick={handleFileUpload}
            className='button-create-activity'
          >
            Відправити
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PassedModal;
