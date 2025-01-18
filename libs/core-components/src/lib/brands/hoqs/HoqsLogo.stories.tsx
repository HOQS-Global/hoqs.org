import type { Meta, StoryObj } from '@storybook/react';
import { HoqsLogo } from './HoqsLogo';

const meta: Meta<typeof HoqsLogo> = {
  component: HoqsLogo
};
export default meta;
type Story = StoryObj<typeof HoqsLogo>;

export const Dark = {
  args: {
    variant: 'dark',
  },
};

export const Light = {
  args: {
    variant: 'light',
  },
};
