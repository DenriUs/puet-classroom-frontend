import { Button } from 'antd';
import { VideoCameraFilled } from '@ant-design/icons';
import './Schedule.scss';

interface Props {}

const Schedule = (props: Props) => (
  <div className='schedule'>
    <p className='schedule__title'>Розклад на сьогодні</p>
    <div className='schedule-containers'>
      <div className='schedule-containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-container'>
          <Button shape='circle' type='primary' className='schedule-button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
      <div className='schedule-containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-container'>
          <Button shape='circle' type='primary' className='schedule-button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
      <div className='schedule-containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-container'>
          <Button shape='circle' type='primary' className='schedule-button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
      <div className='schedule-containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-container'>
          <Button shape='circle' type='primary' className='schedule-button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
      <div className='schedule-containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-container'>
          <Button shape='circle' type='primary' className='schedule-button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Schedule;
