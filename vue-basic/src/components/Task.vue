<template>
  <div class="task">
    <slot name="header"> </slot>
    <span :class="{ done: taskData.done }"> {{ taskData.name }}</span>
    <input type="checkbox" v-model="taskData.done" />
    <slot />
    <slot name="footer"> </slot>
    <button style="margin-left: 20px" @click="onEdit">Edit</button>
  </div>
</template>

<script>
export default {
  name: 'TaskComponent',
  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      taskData: this.task,
    };
  },
  methods: {
    onEdit() {
      this.$emit('edit', this.task);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#abc {
  display: block;
}

.red {
  color: red;
}

.done {
  text-decoration: line-through;
}
</style>
