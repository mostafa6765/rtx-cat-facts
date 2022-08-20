<template>
  <el-row>
    <el-col :span="10" :offset="7">
      <el-alert v-show="formInvalid" :title="formInvalidMessage" type="error" show-icon @close="closeAlert()" />
    </el-col>
    <el-col :span="20" :offset="2">
      <p>Add new cat fact</p>
      <el-form
        ref="form"
        :model="sizeForm"
        label-width="auto"
        :label-position="labelPosition"
        :size="size"
      >
        <el-form-item label="Text *">
          <el-input 
            v-model="sizeForm.text"
            :rows="2"
            type="textarea"
          />
        </el-form-item>
        <el-form-item>
          <el-button>Cancel</el-button>
          <el-button type="primary" :loading="isLoading" @click="onSubmit" >Save</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { http } from '../utils/http'

export default {
  name: 'add-fact',
  setup() {
    const router = useRouter()
    const formInvalid = ref(false)
    const size = ref('default')
    const labelPosition = ref('top')
    const formInvalidMessage = ref()
    const isLoading = ref(false)

    const sizeForm = reactive({
      text: '',
    })

    const closeAlert = () => {
      formInvalid.value = false
    }

    const onSubmit = () => {
      if (sizeForm.text === '') {
        formInvalid.value = true
        formInvalidMessage.value = 'The text field is required.'
        return
      }
      isLoading.value = true
      http.post(`facts/create`, sizeForm)
      .then((response) => {
        isLoading.value = false
        router.push('/facts')
      }).catch((error) => {
        console.log(error.response)
        // validation error check
        if (error.response.status === 400) {
          const msgText = error.response.data.message[Object.keys(error.response.data.message)[0]]
          formInvalid.value = true
          formInvalidMessage.value = msgText[0]
        }
      })
    }

    return {
      size,
      labelPosition,
      sizeForm,
      onSubmit,
      formInvalid,
      closeAlert,
      formInvalidMessage,
      isLoading
    }
  }
}
</script>

<style>
.el-radio-group {
  margin-right: 12px;
}
</style>
