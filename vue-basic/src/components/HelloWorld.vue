<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="name" />
    <input type="checkbox" v-model="isCheck" />
    <span v-bind:id="id" v-show="isShow">{{ name }}</span>
    <button v-on:click="isShow = !isShow">Click here</button>

    <p :class="{ red: isRed, blue: isRed }">{{ !isRed ? 'black' : 'red' }}</p>
    <button @click="isRed = !isRed">
      <span v-if="isRed">black</span>
      <span v-else>red</span>
    </button>

    <div style="margin-top: 20px">
      <h2>{{ titleTask }}</h2>
      <input type="text" v-model="newTask" />
      <button @click="addTask()">Add</button>
      <!-- <div v-for="(task, index) in tasks" :key="index">
        <span :class="{ done: task.done }"> {{ task.name }}</span>
        <input type="checkbox" v-model="task.done" />
      </div> -->
      <Task
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @edit="
          (task) => {
            titleTask = task;
          }
        "
      >
        <template v-slot:header>
          <p>Header Task</p>
        </template>
        <p>Body Task</p>
        <template v-slot:footer>
          <button @click="tasks.splice(index, 1)">Delete Task</button>
        </template>
      </Task>
    </div>

    <div style="margin-top: 20px">
      <router-link to="/tag">TagMultipleSelect</router-link>
    </div>

    <hr />
    <TagMultipleSelect />
    <hr />
    <p>{{ splitNumberByDot(totalMoney) }}</p>
    <button @click="totalMoney += 100000" style="margin-right: 10px">
      Plus
    </button>
    <button @click="totalMoney -= 100000">Minus</button>

    <!-- <hr />
    <div class="list-movie">
      <div v-for="(item, index) in dataImg" :key="index" class="item-movie">
        <img
          :src="`https://the-movie-node.onrender.com/image/${item.poster_path}?api=hieu987`"
          alt=""
          class="img-poster"
        />
      </div>
    </div> -->

    <div>
      <h1>Composition</h1>
      <p>{{ firstName }}</p>
      <p>{{ profile.age }}</p>
      <p>{{ profile.address }}</p>
      <button @click="onChangeName">Click me</button>
    </div>

    <hr />

    <div>
      <input type="text" v-model="textInput" />
      <ul>
        <li v-for="(car, index) in carRender" :key="index">{{ car }}</li>
      </ul>
    </div>

    <teleport to="body">
      <h3>Teleport to tag body</h3>
    </teleport>
  </div>
</template>

<script>
import TagMultipleSelect from './TagMultipleSelect.vue';
import Task from './Task.vue';
import axios from 'axios';
import { ref, reactive, computed, watch, watchEffect } from 'vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    Task,
    TagMultipleSelect,
  },
  setup() {
    const firstName = ref('Nguyễn Duy Hiếu');
    const isChangeName = ref(false);
    const profile = reactive({ age: 20, address: 'Sóc Sơn' });
    const listCar = reactive(['Porsche', 'Lamborgini', 'bulgatti', 'nissan']);
    const textInput = ref('');
    const carRender = computed(() =>
      // Tính toán và chả ra dữ liệu
      listCar.filter((car) =>
        car.toLowerCase().includes(textInput.value.toLowerCase())
      )
    );
    const dataImg = ref([]);

    (async () => {
      await axios
        .get(
          'https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=1'
        )
        .then((movieRespone) => {
          dataImg.value = movieRespone.data.results;
        });
    })();

    watchEffect(() => {
      // Tính toán nhưng không chả ra dữ liệu
      if (textInput.value) {
        console.log('ggg');
      }
    });

    watch(textInput, (newVal, oldVal) => {
      console.log('old: ', oldVal);
      console.log('new: ', newVal);
    });

    const onChangeName = () => {
      isChangeName.value = !isChangeName.value;
      if (isChangeName.value) {
        firstName.value = 'Nguyễn Duy Tân';
        profile.age = 21;
        profile.address = 'Hà Nội';
      } else {
        firstName.value = 'Nguyễn Duy Hiếu';
        profile.age = 20;
        profile.address = 'Sóc Sơn';
      }
    };

    return {
      firstName,
      profile,
      isChangeName,
      onChangeName,
      textInput,
      carRender,
      dataImg,
    };
  },
  data() {
    return {
      newTask: '',
      isCheck: false,
      name: 'Nguyễn Duy Hiếu',
      isShow: true,
      id: 'abc',
      isRed: false,
      tasks: [],
      totalMoney: 1000000,
      data: [],
      titleTask: 'List Task',
    };
  },
  methods: {
    addTask: function () {
      this.tasks.push({ name: this.newTask, done: false });
    },
    splitNumberByDot: (num) => {
      return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
    },
  },
  watch: {
    newTask(newVal, old) {
      console.log('old: ', old);
      console.log('new: ', newVal);
    },
  },
  created() {
    axios
      .get(
        'https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=1'
      )
      .then((movieRespone) => {
        this.data = movieRespone.data.results;
      });
    axios
      .get(
        'https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=2'
      )
      .then((movieRespone) => {
        this.data = this.data.concat(movieRespone.data.results);
      });
    axios
      .get(
        'https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=3'
      )
      .then((movieRespone) => {
        this.data = this.data.concat(movieRespone.data.results);
      });
    axios
      .get(
        'https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=4'
      )
      .then((movieRespone) => {
        this.data = this.data.concat(movieRespone.data.results);
      });
    axios
      .get(
        'https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=5'
      )
      .then((movieRespone) => {
        this.data = this.data.concat(movieRespone.data.results);
      });
    axios
      .get(
        'https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=6'
      )
      .then((movieRespone) => {
        this.data = this.data.concat(movieRespone.data.results);
      });
    axios
      .get(
        'https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=7'
      )
      .then((movieRespone) => {
        this.data = this.data.concat(movieRespone.data.results);
      });
  },
  beforeMount() {
    console.log(document.querySelector('p'));
  },
  mounted() {
    // call api
    console.log(document.querySelector('p'));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#abc {
  display: block;
}

.red {
  color: red;
}

.done {
  text-decoration: line-through;
}
.list-movie {
  margin-left: 70px;
}
.item-movie {
  float: left;
}

.img-poster {
  height: 300px;
  width: 200px;
}

li {
  list-style: none;
}
</style>
