import type { Meta, StoryObj } from '@storybook/react';
import { MainContent } from './MainContent';

const meta: Meta<typeof MainContent> = {
  component: MainContent,
};
export default meta;
type Story = StoryObj<typeof MainContent>;

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
