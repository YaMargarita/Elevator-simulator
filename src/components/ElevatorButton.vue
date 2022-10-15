<template>
  <div class="button-wrapper" @click="floorSelected(button)">
    <span>{{ button }}</span>
    <font-awesome-icon
        icon="square"
        ref="btn-icon"
        class="fa-sm button-icon"
        size="lg"
    />
  </div>
</template>

<script>
export default {
  name: 'ElevatorButton',
  props: {
    button: Number,
    selectedButtons: Array
  },
  watch: {
    selectedButtons: {
      handler(value) {
        const icon = this.$refs['btn-icon'].$el;
        value.includes(this.button) ? icon.classList.add('selected') : icon.classList.remove('selected');
      }, deep: true
    }
  },
  methods: {
    floorSelected(floor) {
      this.$emit('floor-selected', floor);
    }
  }
}
</script>
