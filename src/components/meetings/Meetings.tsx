import { Button, Select } from 'antd';
import { VideoCameraAddOutlined } from '@ant-design/icons';

import './Meetings.scss';

interface Props {}

const Meetings = (props: Props) => (
  <div className='meeting'>
    <div className='meeting__title'>ЗУСТРІЧІ</div>
    <div className='meeting__select-container'>
      <Select
        showSearch
        optionFilterProp='children'
        size='large'
        className='meeting__select'
        placeholder='Виберіть курс'
      />
    </div>
    <div className='meeting__button-container'>
      <Button
        type='primary'
        className='meeting__button-connect'
        shape='round'
        icon={<VideoCameraAddOutlined className='icon' />}
      >
        Розпочати зустріч
      </Button>
    </div>
  </div>
);

export default Meetings;
