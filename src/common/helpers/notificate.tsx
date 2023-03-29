import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Avatar, Modal } from 'antd';
import { ReadOutlined, ReconciliationOutlined } from '@ant-design/icons';
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

export const getIconActivity = (type: CourseActivityTypeEnum) => {
  return type == 'LECTURE' ? <ReadOutlined /> : <ReconciliationOutlined />;
};

export const getUserIcon = (user: Partial<UserEntity | undefined>) => {
  return user?.cover?.src ? (
    <Avatar src={user?.cover?.src} size={40} />
  ) : (
    <Avatar
      style={{ backgroundColor: '#0C4E77', color: '#fff' }}
      size={40}
    >
      {user?.firstName?.charAt(0)}
    </Avatar>
  );
};
