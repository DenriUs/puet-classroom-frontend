import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


export const generateKitToken = (roomId: string, userId: string) =>
  ZegoUIKitPrebuilt.generateKitTokenForTest(
    Number(import.meta.env.VITE_ZEGO_APP_ID),
    import.meta.env.VITE_ZEGO_SERVER_SECRET,
    roomId,
    userId,
    ' ',
  );
