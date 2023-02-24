import { Tabs } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router';

import { tabsItems } from './constants';

import './CourseSettings.scss';

const CourseSettings = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const onLeftClick = () => navigate(-1);

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
