<script setup lang="ts">

type Props = {
  /**
  ボタンの色
   */
  color: 'primary' | 'white'
  /**
  ボタンテキスト
   */
  content: string
  /**
  活性/非活性
   */
  disabled?: boolean
  /**
  ボタンのサイズ
   */
  size?: 'small' | 'medium' | 'large'
  /**
  ボタンの位置
   */
  position?: 'left' | 'center' | 'right'
  /**
  セカンドボタンの有無
   */
  secondBtn?: boolean
  /**
  セカンドボタンの色
   */
  secondBtnColor?: 'primary' | 'black' | 'white' | 'red'
  /**
  セカンドボタンのテキスト
   */
  secondBtnContent?: string
  /**
  セカンドボタンの非活性状態
   */
  secondBtnDisabled?: boolean
  /**
  セカンドボタンのアイコン
   */
  secondBtnIcon?: string
  /**
  アイコン
   */
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  color: 'primary',
  content: '',
  disabled: false,
  size: 'small',
  position: 'center',
  secondBtn: false,
  secondBtnContent: 'cancel',
  secondBtnDisabled: false,
  secondBtnIcon: undefined
})

const emit = defineEmits<{
  (e: 'firstClick'): void
  (e: 'secondClick'): void
}>()

const position = 'position' + props.position

const firstBtnColor = props.color
const variant = firstBtnColor === 'primary' ? 'elevated' : 'outlined'
const elevation = firstBtnColor === 'primary' ? 4 : 0

const secondBtnColor = props.secondBtnColor
const secondBtnVariant = secondBtnColor === 'primary' ? 'elevated' : 'outlined'
const secondBtnElevation = secondBtnColor === 'primary' ? 4 : 0

</script>

<template>
  <div :class="['position', `position-${props.position}`]" class="flame">
    <v-btn
      v-if="secondBtn"
      class="margin"
      :color="secondBtnColor"
      :variant="secondBtnVariant"
      :size="size"
      :elevation="secondBtnElevation"
      :disabled="secondBtnDisabled"
      @click="emit('secondClick')"
    >
      <v-icon v-if="secondBtnIcon" :icon="secondBtnIcon" class="mr-2" />
      {{ secondBtnContent }}
    </v-btn>
    <v-btn
      class="margin"
      :color="firstBtnColor"
      :size="size"
      :variant="variant"
      :elevation="elevation"
      :disabled="disabled"
      @click="emit('firstClick')"
    >
      <v-icon v-if="icon" :icon="icon" class="mr-2" />
      {{ content }}
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
.position {
  display: flex;
  justify-content: center;
  
  &-left {
    justify-content: flex-start;
  }
  &-right {
    justify-content: flex-end;
  }
}

.flame {
  max-height: 30px;
  margin: 16px;
}

.margin {
  margin: 4px;
}

</style>
