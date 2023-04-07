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
        <Step title='Бази даних та інформаційні системи' description='8.00 - 9.30' />
        <Step
          title='Аналіз даних та прикладні пакети статистичної обробки'
          description='9.30 - 10.50'
        />
        <Step title='Програмування' description='11.00 - 12.20' />
        <Step title='Теорія алгоритмів' description='12.40 - 13.20' />
      </Steps>
    </div>
  </div>
);

export default Schedule;
