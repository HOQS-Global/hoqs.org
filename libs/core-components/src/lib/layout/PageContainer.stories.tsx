import type { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from './PageContainer';

const meta: Meta<typeof PageContainer> = {
  component: PageContainer,
};
export default meta;
type Story = StoryObj<typeof PageContainer>;

export const Primary = {
  args: {
    children: <div>
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text. PageContainer with a lot of text.
      PageContainer with a lot of text.
    </div>
  },
};