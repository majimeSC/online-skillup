<template>
  <div>{{ $props.message }}</div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    message: VueTypes.string.isRequired
  }
};
</script>

<style lang="scss" scoped>
//
</style>
