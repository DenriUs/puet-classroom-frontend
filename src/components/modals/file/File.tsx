import { message, Modal } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined, CheckOutlined } from '@ant-design/icons';

import './File.scss';
import { RcFile } from 'antd/lib/upload';
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

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={800}>
      <div className='file-modal'>
        <div className='file-modal__title'>Завантажити файл</div>
        <div className='file-modal__dragger'>
          <Dragger name='File' multiple={false} onChange={onChange} onDrop={onDrop}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
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
