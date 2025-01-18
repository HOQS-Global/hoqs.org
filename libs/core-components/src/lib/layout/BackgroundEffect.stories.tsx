import type { Meta, StoryObj } from '@storybook/react';
import { BackgroundEffect } from './BackgroundEffect';

const meta: Meta<typeof BackgroundEffect> = {
  component: BackgroundEffect,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof BackgroundEffect>;

export const Primary = {
  args: {},
};
