<template>
  <p>{{ item }}</p>
</template>

<script>
export default {
  name: 'MyItem',
  props: {
    item: {
      type: Number,
      default: 0,
    },
  },
};
</script>
