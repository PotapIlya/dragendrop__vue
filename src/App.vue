<template>
  <div class="container" style="display: flex">

    <div style="display: flex; margin-right: 20px">
      <draggable
              group="block"
              :list="dataAside"
              style="border: 1px solid red; padding: 20px; "
              @end="endDraggable"
      >
        <div v-for="item in dataAside" :key="item.id" class="elem" :data-id="item.id"

        >
          {{ item.desc }}
        </div>
      </draggable>
    </div>

    <div style="width: 100%">

      <div style="width: 100%; display: flex; flex-direction: column">

        <div v-for="(row, idxRow) in getRows()" :key="idxRow" style="display: flex; width: 100%">
          <draggable
                  v-for="(el, idxCol) in row" :key="idxCol"
                  v-if="el.active"
                  group="block"
                  class="row"
                  style="border: 1px solid red; padding: 20px;"
                  :class="el.item && Object.keys(el.item).length ? 'width_'+ el.item.width : '' "
                  :data-row="idxRow"
                  :data-col="idxCol"
          >
            <div
                    v-if="el.item && Object.keys(el.item).length"
                    class="elem"
                    style="display: flex; justify-content: space-between"
            >
<!--              <span>{{ el.item.width }} ) </span>-->
<!--              <span>{{ idxRow }} - {{ idxCol }}</span>-->
              <span>{{ el.item.desc }}</span>

                <div style="display: flex">
                    <button @click="changeWidth({idxRow, idxCol}, '-')"> < </button>
                    <button @click="changeWidth({idxRow, idxCol}, '+')"> > </button>
                </div>
            </div>
          </draggable>
        </div>



      </div>

      <button @click="addRow">Add Row</button>
    </div>

  </div>
</template>


<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'App',
    components: {
      draggable
    },
    data: () => ({
      dataAside: [],
    }),
    mounted() {
      this.dataAside = [...this.$store.getters.getAside()];
    },
    computed: {
      getRows(){
        return this.$store.getters.getRows;
      }
    },
    methods: {
      endDraggable(data){
        const {col: colTo, row: rowTo} = data.to.dataset;
        const {id: idFrom} = data.item.dataset;

        this.$store.commit('endMove', {
          colTo, rowTo, idFrom
        })
      },
      addRow(){
        this.$store.commit('addRow')
      },
      changeWidth({idxRow, idxCol}, type){
        this.$store.commit('changeRowWidth', {
          idxRow, idxCol
        })
      }
    }
  }

</script>
