import {
  ExclamationCircleOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Modal, Tag } from 'antd';
import { CourseActivityTypeEnum, UserEntity } from '../types';

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

export const getIconActivity = (type: CourseActivityTypeEnum) =>
  type === 'LECTURE' ? <ReadOutlined /> : <ReconciliationOutlined />;

export const getUserIcon = (user: Partial<UserEntity | undefined>) =>
  user?.cover?.src ? (
    <Avatar src={user?.cover?.src} size={40} />
  ) : (
    <Avatar style={{ backgroundColor: '#0C4E77', color: '#fff' }} size={40}>
      {user?.firstName?.charAt(0)}
    </Avatar>
  );

export const getStatusMark = (mark: number) =>
  !mark ? (
    <Tag icon={<ClockCircleOutlined />} color='geekblue'>
      Здано
    </Tag>
  ) : (
    <Tag icon={<CheckCircleOutlined />} color='success'>
      Оцінено
    </Tag>
  );
