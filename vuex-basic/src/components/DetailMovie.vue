<template>
  <div v-if="dataMovie" class="movie-container">
    <div class="movie-content">
      <img
        :src="`https://the-movie-node.onrender.com/image/${dataMovie.backdrop_path}?api=hieu987`"
        alt=""
      />
      <p>{{ dataMovie.name ? dataMovie.name : dataMovie.title }}</p>
      <p class="overview">{{ dataMovie.overview }}</p>
    </div>
  </div>
  <div v-else>loading...</div>
</template>

<script>
// import axios from 'axios';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
  name: 'DetailMovie',
  props: {},
  data() {
    return {
      //   dataMovie: null,
    };
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    store.dispatch('getDetailMovie', { id: route.params.id });

    const dataMovie = computed(() => store.state.detailMovie);
    return { dataMovie };
  },
  created() {
    // axios
    //   .get(
    //     `https://the-movie-node.onrender.com/movie/${this.$route.params.id}?api=hieu987`
    //   )
    //   .then((movieResponse) => {
    //     this.dataMovie = movieResponse.data;
    //   });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 1000px;
}
.overview {
  width: 50%;
}
.movie-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
