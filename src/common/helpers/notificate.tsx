import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm } = Modal;

export const showDeleteConfirm = (title: string, handle: () => void) => {
  confirm({
    title: `Ви дійсно бажаєте видалити ${title}`,
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
