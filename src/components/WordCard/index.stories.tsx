import { Meta, StoryObj } from "@storybook/vue3";
import WordCard from "./index.vue";

const meta = {
  title: 'Base/WordCard',
  component: WordCard,
  tags: ['autodocs'],
  args: {
    word: 'Hello',
    translation: 'こんにちは'
  },
} satisfies Meta<typeof WordCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    word: 'Hello',
    translation: 'こんにちは'
  }
} 