import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 0 - 3
const MAX_COLUMN = 3;

export default new Vuex.Store({
  state: {
    rows: [
      [
        { id: 0, active: true, item: {} },
        { id: 1, active: true, item: {} },
        { id: 2, active: true, item: {} },
        { id: 3, active: true, item: {} },
      ],
    ],
    aside: [
      {
        id: 1,
        desc: "Пункт продажи",
        active: true,
        width: 0,
      },
      {
        id: 2,
        desc: "Эл. билет",
        active: true,
        width: 0
      },
      {
        id: 3,
        desc: "ИПТ?",
        active: true,
        width: 0
      },
      {
        id: 4,
        desc: "Возврат",
        active: true,
        width: 0
      }
    ]
  },
  getters: {
    getRows: ({rows}) => () => rows,
    getAside: ({aside}) => () => aside,
  },
  mutations: {
    changeRowWidth({rows}, {idxRow, idxCol}) {
      const findElemOnCoords = rows[idxRow][idxCol]

      if (idxCol !== 0 && findElemOnCoords.item.width === 0) {
        findElemOnCoords.item.width = idxCol;
      }

      const range = rows[idxRow][findElemOnCoords.item.width+idxCol]
      // const range  = idxCol + findElemOnCoords.item.width + 1;
      const findNextElemOnCoords = rows[idxRow][findElemOnCoords.item.width+idxCol+1]; // если есть куда двигаться


      if ( findElemOnCoords.item.width < MAX_COLUMN && findNextElemOnCoords ){
        findElemOnCoords.item.width += 1;

        // каждому последующему элементу ставим active = false
        rows[idxRow][findElemOnCoords.item.width].active = false;
      }

      console.log(idxCol, 'startColumn')
      console.log(range?.id, 'end')
      console.log(findNextElemOnCoords?.id, 'next')

    },
    // срабатывает при каждом завершения перетягивания
    endMove({rows, aside}, {rowTo, colTo, idFrom}) {
      const findElemOnCoords = rows[rowTo][colTo];

      // найти в левом столбце и записать в найденный объект
      findElemOnCoords.item = aside.find(el => el.id === +idFrom);
    },

    addRow ({rows}) {
      rows.push([
        { id: 0, active: true, item: {} },
        { id: 1, active: true, item: {} },
        { id: 2, active: true, item: {} },
        { id: 3, active: true, item: {} },
      ])
    }
  },
  actions: {
    // changeRowData ({ commit }, coord) {
    //   console.log(commit('findElemOnCoords', coord));
    // },
    // endDraggable ({ commit }, row, col) {
    //   console.log(commit('findElemOnCoords', row, col));
    // }
  },
  modules: {
  }
})
