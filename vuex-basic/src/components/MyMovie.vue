<template>
  <p>{{ item }}</p>
  <div class="movie-wrapper">
    <router-link to="/">Home</router-link>

    <div class="search-bar">
      <input
        type="text"
        name=""
        id=""
        placeholder="Type year here..."
        v-model="inputValue"
      />
      <button class="btn-search" @click="onSearchMovie">Search</button>
    </div>
    <div v-if="listMovie.length" class="list-movie">
      <div v-for="(movie, index) in listMovie" :key="index" class="item">
        <router-link :to="{ name: 'DetailMovie', params: { id: movie.id } }">
          <img
            :src="`https://the-movie-node.onrender.com/image/${movie.poster_path}?api=hieu987`"
            alt=""
            class="img-poster"
          />
          <p>{{ movie.name ? movie.name : movie.title }}</p>
        </router-link>
      </div>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
// import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'MyMovie',
  props: {},
  data() {
    return {
      count: 0,
      // listMovie: [],
    };
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const inputValue = ref('');
    let dataMovie = reactive([]);

    store.dispatch('getMovie', {
      page: route.params.page,
    });

    const onSearchMovie = () => {
      dataMovie = store.getters.getMovieByYear(inputValue.value);
      console.log(dataMovie);
    };

    return {
      onSearchMovie,
      inputValue,
      dataMovie,
    };
  },
  created() {
    // axios
    //   .get(
    //     `https://the-movie-node.onrender.com/movie/nowplaying?api=hieu987&page=${this.$route.params.page}`
    //   )
    //   .then((movieResponse) => {
    //     this.listMovie = movieResponse.data.results;
    //   });
    this.$store.dispatch('getMovie', { page: this.$route.params.page });
  },
  computed: {
    listMovie() {
      return this.$store.state.listMovie;
    },
    listMovie2022() {
      return this.$store.getters.getMovieByYear;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.movie-wrapper {
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-movie {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  max-width: 1300px;
}
.item {
  margin-left: 10px;
}
.img-poster {
  height: 300px;
}
a {
  text-decoration: none;
}
.search-bar {
  margin-top: 20px;
  height: 40px;
  input {
    height: 85%;
    outline: 1px;
    width: 300px;
    padding-left: 10px;
    font-size: 16px;
    background-color: #1b1b1b;
    border: none;
    &:hover {
      border: 1px solid #004b1f;
    }
    &:focus {
      border: 1px solid #004b1f;
    }
  }
}
.btn-search {
  background-color: #004b1f;
  border: none;
  outline: none;
  height: 100%;
  padding: 0px 20px;
  cursor: pointer;
  &:hover {
    background-color: #003014;
  }
}
</style>
