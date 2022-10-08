import { Button, Input, message, Modal, Select } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import { FileImageOutlined, CheckOutlined } from '@ant-design/icons';

import './Course.scss';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const CourseModal = (props: IProps) => {
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
      <div className="course-modal">
        <div className="course-modal__title-container">Додати курс</div>
        <div className="course-modal__input-container">
          <div>Назва курсу</div>
          <Input className="course-modal__input input" />
        </div>
        <div className="course-modal__description-container">
          <TextArea
            className="course-modal__area"
            autoSize={{ minRows: 4, maxRows: 4 }}
            placeholder="Опис курсу"
            maxLength={1000}
          />
        </div>
        <div className="course-modal__select-container">
          <Select className="course-modal__select" placeholder="Існуючий курс" allowClear>
            <Option>Хімія</Option>
          </Select>
        </div>
        <div className="course-modal__upload-container">
          <Dragger name="Fiel" multiple={true} maxCount={1} onChange={onChange} onDrop={onDrop}>
            <p className="ant-upload-drag-icon">
              <FileImageOutlined />
            </p>
            <p className="ant-upload-text">Оформлення курсу</p>
            <p className="ant-upload-hint">Click or drag image to this area to upload</p>
          </Dragger>
        </div>
        <div className="course-modal__button-container">
          <Button shape="round" onClick={handleClose} className="course-modal__button button">
            Створити
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
