<template>
  <div class="modal" title="Add Crew"  >
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalTemplate",
}
</script>
<style scoped>
/* Add your modal styles here */
.modal {
  /* Modal styles */
}

.modal-content {
  /* Modal content styles */
}
</style>
