import { LoadingOutlined, PictureOutlined } from '@ant-design/icons';
import { Button, Input, Upload } from 'antd';
import { useState } from 'react';

import { useAppSelector } from '../../hooks/reduxhooks';
import AppLoader from '../AppLoader';

import './SettingsProfile.scss';

const SettingsProfile = () => {
  const { user } = useAppSelector((state) => state.authReducer);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  if (!user) return <AppLoader />;

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined className='settings-icon' />
      ) : (
        <PictureOutlined className='settings-icon' />
      )}
      <div className='upload-title'>Upload avatar</div>
    </div>
  );

  return (
    <div className='settings-profile'>
      <div className='settings-profile__container'>
        <div className='settings-profile__title'>Налаштування профілю</div>
        <div className='settings-profile__form'>
          <div className='settings-input'>
            <label className='settings-title-input'>
              Призвіще:
              <Input disabled={true} value={user?.lastName} />
            </label>
          </div>
          <div className='settings-input'>
            <label className='settings-title-input'>
              Ім'я :
              <Input disabled={true} value={user?.firstName} />
            </label>
          </div>
          <div className='settings-input'>
            <label className='settings-title-input'>
              По батькові:
              <Input disabled={true} value={user?.middleName} />
            </label>
          </div>
          <div className='settings-input'>
            <label className='settings-title-input'>
              Email:
              <Input disabled={true} value={user?.email} />
            </label>
          </div>
        </div>
        <div className='settings-profile__upload'>
          <Upload name='avatar' listType='picture-card' showUploadList={false}>
            {imageUrl ? <img src={imageUrl} alt='avatar' /> : uploadButton}
          </Upload>
        </div>
        <div className='settings-profile__button'>
          <Button shape='round' type='primary' className='save-button'>
            Зберегти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
