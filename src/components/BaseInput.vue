<template>
  <input type="text" :placeholder="todo" class="input" />
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