<template>
  <div>
    <div>{{ $props.message }}</div>
    <div>{{ $props.clear }}</div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    message: VueTypes.string.isRequired,
    clear: VueTypes.string.isRequired
  }
};
</script>

<style lang="scss" scoped>
//
</style>
