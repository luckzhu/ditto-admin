<template>
  <svg :class="svgClass">
    <use :xlink:href="iconFullName" aria-hidden="true" />
  </svg>
</template>

<script>
/**
 * iconName 为 icon 的名字，必传
 *  iconClass 为 icon 自定义 class
 */
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconFullName() {
      return `#icon-${this.iconName}`
    },
    svgClass() {
      if (this.iconClass) {
        return 'svg-icon ' + this.iconClass //注意这里有个空格
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>