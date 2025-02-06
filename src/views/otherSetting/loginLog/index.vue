<template>
  <div class="businessSetings" style="height: 1000px;">
      <iframe-com :src="src"></iframe-com>
  </div>
</template>

<script>
import IframeCom from '@/components/common/IframeCom.vue'
export default {
  components: {
      IframeCom
  },
  data() {
      return {
          src: '/admin/log.php?pageSize=30&pageNumber=1&column=uid'
      }
  },
  methods: {
  }
}
</script>

<style>

</style>