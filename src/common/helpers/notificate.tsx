import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { ReadOutlined, ReconciliationOutlined } from '@ant-design/icons';
import { CourseActivityTypeEnum } from '../types';

const { confirm } = Modal;

export const showConfirm = (title: string, handle: () => void) => {
  confirm({
    title: `Ви дійсно бажаєте ${title}`,
    icon: <ExclamationCircleOutlined />,
    okText: 'Так',
    okType: 'danger',
    cancelText: 'Ні',
    centered: true,
    onOk() {
      handle();
    },
  });
};

export const getIconActivity = (type: CourseActivityTypeEnum) => {
  return type == 'LECTURE' ? <ReadOutlined /> : <ReconciliationOutlined />;
};
