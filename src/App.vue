<template>
  <elevator :lift-count="liftCount" :floor-count="floorCount"/>
</template>

<script>
import Elevator from '@/components/Elevator';

export default {
  name: 'App',
  components: {
    Elevator
  },
  data() {
    return {
      liftCount: 1,
      floorCount: 5
    }
  }
}
</script>
