import { Button, message, Modal } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { InboxOutlined, CheckOutlined } from '@ant-design/icons';

import './Practical.scss';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const PracticalModal = (props: IProps) => {
  const { onStart, handleClose } = props;

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
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={600}>
      <div className="practical-modal-title">
        Практична робота 1. Базові поняття інформаційних мереж
      </div>
      <Dragger name="Fiel" multiple={true} maxCount={1} onChange={onChange} onDrop={onDrop}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or
          other band files
        </p>
      </Dragger>
      <div className="practical-modal-button">
        <Button
          shape="round"
          icon={<CheckOutlined className="icon" />}
          onClick={handleClose}
          className="button-connect"
        >
          Здати роботу
        </Button>
      </div>
    </Modal>
  );
};

export default PracticalModal;
