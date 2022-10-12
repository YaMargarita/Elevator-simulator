<template>
  <div class="app-wrapper">
    <div v-for="lift in liftCount"
         :key="lift">

      <div class="elevator">
        <cabin
            ref="cabin"
            :currentCabin="lifts[lift - 1]"
            @cabinReach="cabinReach"
            @cabinFinish="cabinFinish"
        />

        <div
            v-for="floor in floorCount"
            :key="floor"
            class="floor-block">
        </div>
      </div>
    </div>

    <div class="elevator-buttons">
      <elevator-button
          v-for="button in floorCount"
          :key="button"
          :button="button"
          :selectedButtons="selectedButtons"
          @floor-selected="floorSelected"
      />
    </div>
  </div>
</template>

<script>
import Cabin from '@/components/Cabin';
import ElevatorButton from '@/components/ElevatorButton';
export default {
  name: "Elevator",
  components: {
    Cabin, ElevatorButton
  },
  props: {
    liftCount: Number,
    floorCount: Number
  },
  data() {
    return {
      lifts: [],
      selectedFloors: [],
      selectedButtons: []
    }
  },
  watch: {
    selectedFloors: {
      handler(value) {
        this.startMovement(value)
      }, deep: true
    }
  },
  created() {
    for (let i = 0; i < this.liftCount; i++) {
      const lift = {
        index: i,
        currentFloor: 1,
        nextFloor: null,
        inMove: false,
        movementDirection: ''
      };
      this.lifts.push(lift);
    }
  },
  methods: {
    startMovement(value) {
      if (value.length > 0) {
        const cabin = this.getFreeNearestCabin(value[0]);

        if (cabin) {
          cabin.nextFloor = this.selectedFloors.shift();
          this.$refs.cabin[cabin.index].movement();
        }
      }
    },
    cabinReach(cabin) {
      const index = this.selectedButtons.findIndex(btn => btn === cabin.currentFloor);
      this.selectedButtons.splice(index, 1);
    },
    cabinFinish() {
      this.startMovement(this.selectedFloors);
    },
    canFloorSelected(floor) {
      if (this.lifts.find(lift => lift.currentFloor === floor || lift.nextFloor === floor)) return false;

      return !this.selectedFloors.includes(floor);
    },
    floorSelected(floor) {
      if (!this.canFloorSelected(floor)) return;

      this.selectedFloors.push(floor);
      this.selectedButtons.push(floor);
    },
    getFreeNearestCabin(floor) {
      const freeCabins = this.lifts.filter(lift => !lift.inMove);
      if (!freeCabins.length) return;

      return freeCabins.reverse().reduce((a, b) => {
        return Math.abs(a.currentFloor - floor) < Math.abs(b.currentFloor - floor) ? a : b
      });
    }
  }
}
</script>
