<template>
  <div class="about">
    <!-- Display the data with a structured table, element-ui is ready for use -->
    <el-row>
      <el-col :span="20" :offset="2">
        <el-button type="success" :loading="isLoadingRefetch" @click="getFacts()">
            Refetch fact
        </el-button>
        <el-button type="info" @click="router.push('/facts/add')">
            Add New Fact
        </el-button>
        <el-table :data="facts" height="340" style="width: 100%">
          <el-table-column prop="_id" label="ID" width="280" />
          <el-table-column prop="text" label="TEXT" width="380" />
          <el-table-column prop="type" label="TYPE" width="280" />
          <el-table-column label=" " width="280">
            <template v-slot="scope">
              <el-button-group class="ml-4">
                <el-button type="info" @click="updateFact(scope.row)" >
                  Edit
                </el-button>
                <el-button type="danger" @click="deleteFact(scope.$index , scope.row)">
                  Delete
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="5" :offset="10">
        <el-pagination background layout="prev, pager, next" :total="totalFacts" :page-size="perPage" @current-change="handleCurrentPageChange" />
      </el-col>
    </el-row>
    <delete-modal 
      :deleteFactModal="deleteFactModal"
      :fact="deletedFactItem"
      @modalClose="modalClose"
      @confirmDeleteFact="confirmDeleteFact"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import DeleteModal from '../components/Modal/DeleteModal.vue'
import { http } from '../utils/http'

export default {
  name: 'facts',
  components: { 
    'delete-modal': DeleteModal,
  },
  setup(context) {
    const router = useRouter()
    const facts = ref([]);
    const deletedFactItem = ref({})
    const totalFacts = ref(0)
    const perPage = ref(5)
    const page = ref(1)
    const deleteFactModal = ref(false)
    const isLoadingRefetch = ref(false)

    // Get data from backend
    const getFacts = async () => {
      isLoadingRefetch.value = true
      http.get('/facts/get', {
        params: {
          per_page: perPage.value,
          page: page.value,
        },
      }).then((response) => {
        isLoadingRefetch.value = false
        if (response.data?.data?.length) {
          facts.value = response.data.data
          totalFacts.value = response.data.total
        }
      })
    };

    const handleCurrentPageChange = (value) => {
      page.value = value
      getFacts();
    }

    const deleteFact = (index, value) => {
      deleteFactModal.value = true
      deletedFactItem.value = value
    }

    const confirmDeleteFact = (value) => {
      deleteFactModal.value = false
      http.delete(`/facts/delete/${value['_id']}`)
      .then((response) => {
        if (response.status === 200) {
          getFacts()
        }
      }).catch((error) => {
        // error.response
      })
    }

    const modalClose = (value) => {
      deleteFactModal.value = value
    }

    const updateFact = (value) => {
      router.push(`facts/${value['_id']}/edit`)
    }

    onMounted(() => {
      getFacts();
    });

    return {
      facts,
      totalFacts,
      perPage,
      deleteFactModal,
      deletedFactItem,
      modalClose,
      handleCurrentPageChange,
      deleteFact,
      confirmDeleteFact,
      updateFact,
      router,
      getFacts,
      isLoadingRefetch
    };
  },
};

</script>
