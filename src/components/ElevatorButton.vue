<template>
  <div class="button-wrapper" @click="floorSelected(button)">
    <span>{{ button }}</span>
    <font-awesome-icon
        icon="square"
        class="fa-sm button-icon"
        size="lg"
        :class="{'selected' : selectedButtons.includes(button)}"
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
  methods: {
    floorSelected(floor) {
      this.$emit('floor-selected', floor);
    }
  }
}
</script>
