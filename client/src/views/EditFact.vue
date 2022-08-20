<template>
  <el-row>
    <el-col :span="10" :offset="7">
      <el-alert v-show="updatedData" :title="alertMessage" :type="alertType" show-icon @close="closeAlert()" />
    </el-col>
    <el-col :span="20" :offset="2">
      <p>Update Fact - <strong>{{route.params.id}}</strong></p>
      <el-form
        ref="form"
        :model="sizeForm"
        label-width="auto"
        :label-position="labelPosition"
        :size="size"
      >
        <el-form-item label="Text">
          <el-input 
            v-model="sizeForm.text"
            :rows="2"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="Type">
          <el-input 
            v-model="sizeForm.type"
            disabled
          />
        </el-form-item>
        <el-form-item>
          <el-button>Cancel</el-button>
          <el-button type="primary" @click="onSubmit" >Update</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { http } from '../utils/http'

export default {
  name: 'edit-fact',
  setup() {
    const route = useRoute();
    const router = useRouter()
    const updatedData = ref(false)
    const alertType = ref('')
    const alertMessage = ref('')

    const size = ref('default')
    const labelPosition = ref('top')

    const sizeForm = reactive({
      text: '',
      type: ''
    })

    function onSubmit() {
      if (sizeForm.text === '') {
        updatedData.value = true
        alertMessage.value = 'Text field is required'
        alertType.value = 'error'
        return
      }
      http.put(`facts/update/${route.params.id}`, sizeForm)
      .then((response) => {
        alertMessage.value = 'Fact updated'
        alertType.value = 'success'
        updatedData.value = true
      })
    }

    const closeAlert = () => {
      updatedData.value = false
    }

    const getFact = (id) => {
      http.get(`/facts/get/${id}`, {})
      .then((response) => {
        const {text, type} = response.data
        sizeForm.text = text
        sizeForm.type = type
      }).catch((error) => {
        if (error.response.status === 404) {
          router.push('/facts')
        }
      })
    }

    onMounted(() => {
      getFact(route.params.id)
    });

    return {
      route,
      size,
      labelPosition,
      sizeForm,
      onSubmit,
      updatedData,
      closeAlert,
      alertMessage,
      alertType,
    }
  }
}
</script>

<style>
.el-radio-group {
  margin-right: 12px;
}
</style>
