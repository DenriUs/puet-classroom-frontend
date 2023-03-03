import { Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

import './CourseSettings.scss';

import { SagaAction } from '../../../common/types';
import { tabsItems } from './constants';
import { useAppDispatch } from '../../../hooks/reduxhooks';

const CourseSettings = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onLeftClick = () => {
    dispatch({ type: SagaAction.COURSES_RESET });
    navigate(-1);
  };

  return (
    <div className='couser-settings'>
      <div className='couser-settings__title-container'>
        <LeftOutlined className='couser-settings__icon-back' onClick={onLeftClick} />
        <span className='couser-settings__settings-name'>Налаштування курсу</span>
      </div>
      <div className='couser-settings__tabs-container'>
        <Tabs
          defaultActiveKey='1'
          centered
          tabPosition='left'
          items={tabsItems.map(({ label, key, children, icon }) => {
            return {
              label: (
                <span>
                  {icon} {label}
                </span>
              ),
              key,
              children,
            };
          })}
        />
      </div>
    </div>
  );
};

export default CourseSettings;
