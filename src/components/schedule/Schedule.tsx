import { Button } from 'antd';
import { VideoCameraFilled } from '@ant-design/icons';
import './Schedule.scss';

interface Props {}

const Schedule = (props: Props) => (
  <div className='box'>
    <p className='box__name'>Розклад на сьогодні</p>
    <div className='containers'>
      <div className='containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-group'>
          <Button shape='circle' className='button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
      <div className='containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-group'>
          <Button shape='circle' className='button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
      <div className='containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-group'>
          <Button shape='circle' className='button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
      <div className='containers__container'>
        <span className='title'>Хімія</span>
        <div className='couple'>
          <span>2 пара</span>
        </div>
        <div className='decription'>
          <span className='decription__time'>09:30-10:50</span>
          <span className='decription__online'>Дистанційно</span>
        </div>
        <div className='button-group'>
          <Button shape='circle' className='button'>
            <VideoCameraFilled className='button__icon' />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Schedule;
