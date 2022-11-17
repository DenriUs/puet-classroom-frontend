import { Modal, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import './Settings.scss';
import { tabsItems } from './constants';

interface IProps {
  onStart: boolean;
  handleClose: () => void;
}

const SettingModal = (props: IProps) => {
  const { onStart, handleClose } = props;

  return (
    <Modal centered open={onStart} onCancel={handleClose} footer={null} width={1200}>
      <div className='settings-modal'>
        <Tabs
          defaultActiveKey='1'
          centered
          tabPosition='left'
          items={tabsItems.map(({ label, key, children, icon }) => {
            return {
              label: (
                <span>
                  {icon} {label}
                </span>
              ),
              key,
              children,
            };
          })}
        />
      </div>
    </Modal>
  );
};

export default SettingModal;
