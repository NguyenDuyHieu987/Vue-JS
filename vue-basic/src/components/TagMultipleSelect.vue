<template>
  <div class="tags">
    <div class="list-tag">
      <div
        v-for="(language, index) in languages"
        :key="index"
        class="item-lang"
        :class="{ selected: language.selected }"
        @click="language.selected = !language.selected"
      >
        <span>{{ language.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'TagMultipleSelect',
      languages: [
        { name: 'php', selected: false },
        { name: 'javascript', selected: false },
        { name: 'python', selected: false },
        { name: 'java', selected: false },
        { name: 'C#', selected: false },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.list-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.item-lang {
  float: left;
  padding: 10px 15px;
  background-color: #003b20;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #00882b;
  }
  &.selected {
    background-color: #00882b;
  }
}
</style>
