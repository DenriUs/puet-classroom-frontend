import { Steps } from 'antd';
import { getCurrentDate } from '../../common/helpers';
import './Schedule.scss';

const { Step } = Steps;

interface Props {}

const Schedule = (props: Props) => (
  <div className='schedule'>
    <div className='schedule__title'>РОЗКЛАД НА СЬОГОДНІ {getCurrentDate()}</div>
    <div>
      <Steps size='small' progressDot current={2} direction='vertical'>
        <Step title='Алгоритми' description='8.00 - 9.30' />
        <Step
          title='Маркетинг'
          description='9.30 - 10.50'
        />
        <Step title='Граматика' description='11.00 - 12.20' />
      </Steps>
    </div>
  </div>
);

export default Schedule;
