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
      liftCount: 3, // количество шахт лифта
      floorCount: 5 // количество этажей
    }
  }
}
</script>
