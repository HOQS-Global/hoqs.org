import { BackgroundEffect, PageContainer, Provider, storyRouterDecorator } from "@hoqs/core-components";
import { withThemeByClassName } from '@storybook/addon-themes';
import {messages} from '../src/text-en-US';

export const decorators = [
  storyRouterDecorator,
  (Story) => (
    <Provider messages={messages}>
      <div className="min-w-screen min-h-screen flex relative items-center flex-col">
        <PageContainer>
          <Story />
          <BackgroundEffect/>
        </PageContainer>
      </div>
    </Provider>
  ),
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
  }),
];
