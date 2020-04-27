<template>
  <div class="row">
    <input type="text" :placeholder="todo" class="input" />
    <input type="button" value="Add" class="btn addBtn" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: "todo item"
    };
  }
};
</script>