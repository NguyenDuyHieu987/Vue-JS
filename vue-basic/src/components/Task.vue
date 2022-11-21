<template>
  <div class="task">
    <span :class="{ done: taskData.done }"> {{ taskData.name }}</span>
    <input type="checkbox" v-model="taskData.done" />
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
