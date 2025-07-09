---
title: "Storybook"
date: 2024-01-02
categories: ["react"]
---


## Components

In a component file (**/Indicator**), create the storybook file. Indicator.stories.tsx

```jsx
import type { Meta, StoryObj } from '@storybook/react'

import Indicator from './Indicator'

const meta: Meta<typeof Indicator> = {
  component: Indicator,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Indicator>
```

Add individual *stories*.

```jsx
export const Success: Story = {
  args: {
    status: 'success',
  }
}
export const Warning: Story = {
  args: {
    status: 'warning',
  }
}

export const Error: Story = {
  args: {
    status: 'error',
  }
}
```

```tsx
import type { Meta, StoryObj } from '@storybook/react'

import Indicator from './Indicator'

const meta: Meta<typeof Indicator> = {
  component: Indicator,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Indicator>

export const Success: Story = {
  args: {
    status: 'success',
  }
}
export const Warning: Story = {
  args: {
    status: 'warning',
  }
}

export const Error: Story = {
  args: {
    status: 'error',
  }
}
```
