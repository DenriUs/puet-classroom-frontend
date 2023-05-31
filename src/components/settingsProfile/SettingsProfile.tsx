import { Button, Input, UploadFile, UploadProps } from 'antd';
import { useState, useEffect } from 'react';
import { SagaAction, UserRoleEnum } from '../../common/types';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxhooks';
import AppLoader from '../AppLoader';
import ImageUpload from '../imageUpload/ImageUpload';

import './SettingsProfile.scss';

import telegramLogo from '../../assets/telegram-logo.svg';

const SettingsProfile = () => {
  const { user } = useAppSelector((state) => state.profileReducer);
  const { file } = useAppSelector((state) => state.filesReducer);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const dispatch = useAppDispatch();

  const onDraggerChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList[0]) newFileList[0].status = 'done';
    setFileList(newFileList);
  };

  const handleTelegramClick = () => {};

  const handleUserUpdate = () =>
    dispatch({
      type: SagaAction.FILE_UPLOAD,
      payload: { id: user?.cover.id, file: fileList[0]?.originFileObj },
    });

  useEffect(() => {
    dispatch({ type: SagaAction.PROFILE_GET });
  }, [dispatch, file]);

  if (!user) return <AppLoader />;

  return (
    <div className='settings-profile'>
      <div className='settings-profile__container'>
        <div className='settings-profile__title'>Налаштування профілю</div>
        <div className='settings-profile__upload'>
          <ImageUpload
            id={user?.cover.id as string}
            url={user?.cover.src as string}
            name={user?.cover.filename as string}
            onChange={onDraggerChange}
          />
        </div>
        <div className='settings-profile__form'>
          <div className='settings-input'>
            <label className='settings-title-input'>
              Призвіще:
              <Input disabled value={user?.lastName} />
            </label>
          </div>
          <div className='settings-input'>
            <label className='settings-title-input'>
              Ім'я :
              <Input disabled value={user?.firstName} />
            </label>
          </div>
          <div className='settings-input'>
            <label className='settings-title-input'>
              По батькові:
              <Input disabled value={user?.middleName} />
            </label>
          </div>
          <div className='settings-input'>
            <label className='settings-title-input'>
              Email:
              <Input disabled value={user?.email} />
            </label>
          </div>
          {user.role !== UserRoleEnum.ADMIN && (
            <div className='telegram-button__container'>
              <Button
                type='text'
                shape='round'
                icon={<img className='telegram-button__icon' alt='' src={telegramLogo} />}
                className='telegram-button'
                onClick={handleTelegramClick}
              >
                Підключити Telegram-розклад
              </Button>
            </div>
          )}
        </div>
        <div className='settings-profile__button'>
          <Button
            onClick={() => handleUserUpdate()}
            shape='round'
            type='primary'
            className='save-button'
          >
            Зберегти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
