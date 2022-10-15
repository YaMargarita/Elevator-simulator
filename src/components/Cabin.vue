<template>
  <div class="cabin" ref="cabin">
    <div v-show="cabin.inMove" class="cabin-display">
      <font-awesome-icon
          icon="arrow-up"
          class="display-arrow-icon"
          ref="arrow-icon"
      />
      <span class="display-floor-number">{{ cabin.nextFloor }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cabin",
  props: {
    currentCabin: Object
  },
  data() {
    return {
      cabin: {},
    }
  },
  created() {
    this.cabin = this.currentCabin;

    this.emitter.on('move', ({ currentCabin }) => {
      if (currentCabin === this.cabin.index) this.movement();
    });
  },
  methods: {
    movement() {
      this.cabin.inMove = true;
      this.cabin.movementDirection = this.cabin.nextFloor > this.cabin.currentFloor ? 'up' : 'down';
      this.$refs['arrow-icon'].$el.classList.add(this.cabin.movementDirection);

      this.animationMovement();
      this.cabin.currentFloor = this.cabin.nextFloor;

      this.$refs.cabin.ontransitionend = async () => {
        this.cabin.currentFloor = this.cabin.nextFloor;
        this.$emit('cabin-reach', this.cabin);

        this.$refs.cabin.classList.add('blink');
        await this.blinkAnimation();
        this.cabin.nextFloor = '';
        this.cabin.inMove = false;
        this.$refs['arrow-icon'].$el.classList.remove(this.cabin.movementDirection);
        this.$emit('cabin-finish', this.cabin);
      };
    },
    blinkAnimation() {
      return new Promise(resolve => setTimeout(() => {
        resolve(this.$refs.cabin.classList.remove('blink'));
      }, 3000));
    },
    animationMovement() {
      const pxl = (this.cabin.nextFloor - 1) * 120;
      this.$refs.cabin.style.transform = `translateY(-${pxl}px)`;
      const time = Math.abs(this.cabin.nextFloor - this.cabin.currentFloor);
      this.$refs.cabin.style.transition = `all ${time}s`;
    }
  }
}
</script>
