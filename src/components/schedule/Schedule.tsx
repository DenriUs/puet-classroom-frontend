import { Steps } from 'antd';
import './Schedule.scss';

const { Step } = Steps;

interface Props {}

const Schedule = (props: Props) => (
  <div className='schedule'>
    <div className='schedule__title'>РОЗКЛАД НА СЬОГОДНІ 11.10.2022</div>
    <div>
      <Steps size='small' progressDot current={2} direction='vertical'>
        <Step title='Бази даних та інформаційні системи' description='8.00 - 9.30' />
        <Step
          title='Аналіз даних та прикладні пакети статистичної обробки'
          description='9.30 - 10.50'
        />
        <Step title='Хімія' description='11.00 - 12.20' />
        <Step title='Фізкультура' description='12.40 - 13.20' />
      </Steps>
    </div>
  </div>
);

export default Schedule;
