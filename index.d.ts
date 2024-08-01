declare module '@alirehman7141/chatwoot-react-native-widget' {
  import React from 'react';

  export interface ChatWootWidgetProps {
    websiteToken: string;
    locale?: string;
    baseUrl: string;
    colorScheme?: 'light' | 'auto' | 'dark';
    closeModal: () => void;
    onMessage: (data: any) => void;
    isModalVisible: boolean;
    withModal: boolean,
    user?: {
      identifier?: string;
      name?: string;
      avatar_url?: string;
      email?: string;
      identifier_hash?: string;
    };
    // This can actually be any object
    customAttributes?: Record<string, unknown>;
  }

  class ChatWootWidget extends React.Component<ChatWootWidgetProps, any> { }
  export default ChatWootWidget;
}
