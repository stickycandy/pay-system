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
          src: '/admin/set.php?mod=site'
      }
  },
  methods: {
  }
}
</script>

<style>

</style>