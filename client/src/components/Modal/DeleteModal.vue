<template>
  <el-dialog
    v-model="modalOpen"
    title="Delete Fact"
    width="30%"
    destroy-on-close
    center
    @closed="modalClose"
  >
    <span
      >{{theFact?.text}}</span
    >
    <div>
      <strong> id:  {{theFact?._id}} </strong>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalClose()">Cancel</el-button>
        <el-button type="primary" @click="confirmDelete()"
          >Confirm</el-button
        >
      </span>
    </template>
    </el-dialog>
</template>

<script>
import {ref, watch} from 'vue'

export default {
  props: ['deleteFactModal', 'fact'],
  emits: ['modalClose', 'confirmDeleteFact'],
  setup(props, context) {
    const modalOpen = ref(false)
    const theFact = ref({})

    watch(props, (currentValue, oldValue) => {
      modalOpen.value = props.deleteFactModal
      theFact.value = props.fact
    });

    const modalClose = () => {
      context.emit('modalClose', false);
    }

    const confirmDelete = () => {
      context.emit('confirmDeleteFact', theFact.value)
    }
    
    return {
      modalOpen,
      theFact,
      modalClose,
      confirmDelete,
    }
   },
 }
</script>
