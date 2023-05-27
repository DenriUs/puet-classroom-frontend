import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useEffect } from 'react';

import { generateKitToken } from '../../common/api/services/chat';
import { getUrlParams, randomID } from '../../common/helpers';
import AppLoader from '../../components/AppLoader';
import { useAppSelector } from '../../hooks/reduxhooks';

const Chat = () => {
  const { user } = useAppSelector((state) => state.profileReducer);

  if (!user) return <AppLoader />;

  const roomID = getUrlParams().get('roomID') || randomID(5);

  const kitToken = generateKitToken(roomID, user.id);

  const zp = ZegoUIKitPrebuilt.create(kitToken);

  const meeting = async (element: any) => {
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
        },
      ],
      showRemoveUserButton: false,
      showTurnOffRemoteCameraButton: false,
      showTurnOffRemoteMicrophoneButton: false,
    });
  };

  useEffect(
    () => () => {
      zp.destroy();
    },
    [],
  );

  return <div ref={meeting} style={{ width: '100vw', height: '100vh' }} />;
};

export default Chat;
