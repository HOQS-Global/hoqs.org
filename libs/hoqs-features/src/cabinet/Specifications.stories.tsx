import type { Meta, StoryObj } from '@storybook/react';
import { Specifications } from './Specifications';

const meta: Meta<typeof Specifications> = {
  component: Specifications,
};
export default meta;
type Story = StoryObj<typeof Specifications>;

export const Primary = {
  args: {},
};
