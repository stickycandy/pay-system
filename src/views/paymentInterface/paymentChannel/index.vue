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
          src: '/admin/pay_channel.php?type=0&dstatus=-1'
      }
  },
  methods: {
  }
}
</script>

<style>

</style>