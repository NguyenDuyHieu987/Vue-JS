<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div ref="hieu" v-bind="objectOfAttrs">Hiếu</div>
  <div :class="classObject">2002</div>
  <div><button @click="click()">Click</button></div>
  <router-link :to="{ name: 'MyMovie', params: { page: 1 } }"
    >My Movie</router-link
  >
  <Item
    v-for="(item, index) in items"
    :item="item"
    :index="index"
    :key="item.id"
  />
</template>
<script>
import { debounce } from 'lodash-es';
import Item from './Item.vue';
import { onMounted, ref } from 'vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    Item,
  },
  setup() {
    const hieu = ref(null);
    onMounted(() => {
      console.log(hieu.value);
    });
    return {
      hieu,
    };
  },
  data() {
    return {
      objectOfAttrs: {
        id: 'container',
        class: 'wrapper',
      },
      isActive: true,
      error: null,
      items: [1, 2, 3, 4],
    };
  },
  methods: {
    // Debouncing with Lodash
    click: debounce(function () {
      console.log('hiếu');
    }, 3000),
  },
  computed: {
    classObject() {
      return {
        active: this.isActive && !this.error,
        'text-danger': this.error && this.error.type === 'fatal',
      };
    },
  },
  mounted() {
    console.log(this.$refs.hieu);
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
</style>
