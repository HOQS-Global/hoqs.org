import { storyRouterDecorator } from "@hoqs/core-components";
import { Provider } from "../src/lib/provider";
import { withThemeByClassName } from '@storybook/addon-themes';

export const decorators = [
  storyRouterDecorator,
  (Story) => (
    <Provider>
      <Story />
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
