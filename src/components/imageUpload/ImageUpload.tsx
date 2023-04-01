import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { message, Modal, Upload } from 'antd';
import { UploadChangeParam, RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';

import './ImageUpload.scss';

import { getBase64 } from '../../common/helpers';

interface Props {
  id: string;
  name: string;
  url: string;
  onChange: UploadProps['onChange'];
}

const ImageUpload = (props: Props) => {
  const { id, name, url, onChange } = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: id,
      name,
      url,
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const onUpload = (event: UploadChangeParam<UploadFile>) => {
    if (event.fileList.some((file) => file.size && file.size > 5e7)) {
      message.error('Uploaded file is too large');
    }
    setFileList(event.fileList);
    if (onChange) onChange(event);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className='upload-button'>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        accept={'image/*'}
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={onUpload}
      >
        {fileList?.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='preview' className='img-preview' src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
