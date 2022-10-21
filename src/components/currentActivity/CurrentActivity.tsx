import { UserOutlined } from '@ant-design/icons';

import './CurrentActitivity.scss';

import live from '../../global/images/icons/live.png';

interface Props {}

const CurrentActivity = (props: Props) => (
  <div className='current-activity'>
    <div className='current-activity__container'>
      <div className='current-activity__title'>
        Аналіз даних та прикладні пакети статистичної обробки
      </div>
      <div className='current-activity__owner'>
        <UserOutlined className='icon' />
        Комар Ілля
      </div>
      <div className='current-activity__image'>
        <img className='title-icon' src={live} alt='live' />
      </div>
    </div>
  </div>
);

export default CurrentActivity;
