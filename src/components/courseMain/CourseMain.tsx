import { Tabs } from 'antd';
import CardLecture from '../cardLecture/CardLecture';
import PracticalLecture from '../practicalLecture/PracticalLecture';
import './CourseMain.scss';

interface Props {}

const CourseMain = (props: Props) => {
  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={[
        {
          label: `Лекції`,
          key: '1',
          children: [<CardLecture />, <CardLecture />],
        },
        {
          label: `Практичні`,
          key: '2',
          children: [<PracticalLecture />, <PracticalLecture />],
        },
      ]}
    />
  );
};

export default CourseMain;
