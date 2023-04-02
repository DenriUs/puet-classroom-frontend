import { UploadOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { message } from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import Dragger from 'antd/lib/upload/Dragger';

import './FileUpload.scss';

interface Props {
  onChange: UploadProps['onChange'];
}

const FileUpload = (props: Props) => {
  const { onChange } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onUpload = (event: UploadChangeParam<UploadFile>) => {
    if (event.fileList.some((file) => file.size && file.size > 5e7)) {
      message.error('Uploaded file is too large');
    }
    setFileList(event.fileList);
    if (onChange) onChange(event);
  };

  return (
    <Dragger
      listType='picture'
      maxCount={1}
      onChange={onUpload}
      fileList={fileList}
      name='file'
      accept={'.pdf'}
      iconRender={() => <FilePdfOutlined />}
    >
      <p className='ant-upload-drag-icon'>
        <UploadOutlined />
      </p>
      <p className='ant-upload-text'>Click or drag file to this area to upload</p>
      <p className='ant-upload-hint'>Only PDF</p>
      <p className='ant-upload-hint'>Max file size if 50 MB</p>
    </Dragger>
  );
};

export default FileUpload;
