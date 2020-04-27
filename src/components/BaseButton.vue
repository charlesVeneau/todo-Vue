<template>
  <button class="svg-wrapper">
    <svg class="svg" :width="width" :height="height">
      <use v-bind="{'xlink:href':'/feather-sprite.svg#'+name}" />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    color: String
  },
  methods: {
    btnClick() {}
  }
};
</script>

<style lang="scss" scoped>
.svg-wrapper {
  border: none;
  font-size: 1.4rem;
  padding: 0.6rem;
  outline: none;
  background-color: color;
  color: #fff;
  &:hover {
    background-color: rgb(117, 209, 137);
  }
}
.svg {
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>