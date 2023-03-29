import { message, Modal } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';

import './File.scss';

import { useAppDispatch } from '../../../hooks/reduxhooks';
import { SagaAction } from '../../../common/types';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const FileModal = (props: IProps) => {
  const { onStart, handleClose } = props;

  const dispatch = useAppDispatch();

  const onChange = (info: any) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onDrop = (e: any) => {
    console.log('Dropped files', e.dataTransfer.files);
  };

  const handleFileUpload = ({ file }: any) => {
    dispatch({ type: SagaAction.FILE_CREATE, payload: file });
  };

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={800}>
      <div className='file-modal'>
        <div className='file-modal__title'>Завантажити файл</div>
        <div className='file-modal__dragger'>
          <Dragger
            multiple={false}
            showUploadList={false}
            onChange={onChange}
            onDrop={onDrop}
            customRequest={handleFileUpload}
          >
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click to this area to upload</p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibit from uploading company data or
              other band files
            </p>
          </Dragger>
        </div>
      </div>
    </Modal>
  );
};

export default FileModal;
