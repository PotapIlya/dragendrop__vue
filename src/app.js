
import draggable from 'vuedraggable'
import json from './json'

export default {
    name: 'App',
    components: {
        draggable
    },
    data: () => ({
        defaultArr: [], // предзабитые категории
        rows: [
            [
                { name: 0, items: [] },
                { name: 1, items: [] },
                { name: 2, items: [] },
                { name: 3, items: [] },
            ]
        ],
        //COORD
        //from
        coordFromRow: null, // прошлая строка
        coordFromColumn: null, // прошлая колонка
        //to
        coordToRow: null, // нынешняя строка
        coordToColumn: null, // нынешняя колонка
        // el
        fromElem: null, // прошлый элемент
        toElem: null, // нынешний элемент
        // width el
        toElemWidth: null, // нынешняя длина элемента
    }),
    mounted() {
        this.defaultArr = json.BlockpageSearcher.fields
    },
    watch: {

    },
    methods: {
        updateWidthElem(){
            this.toElemWidth = this.rows[this.coordToRow][this.coordToColumn].items[0].width
        },
        // обновляем координаты когда жмем нап стрелку или перетаскиваем
        updateCoords(row, column){
            // to
            this.coordToRow = row
            this.coordToColumn = column
            // elements
            this.fromElem = this.rows[this.coordFromRow][this.coordFromColumn]

            this.toElem = this.rows[this.coordToRow][this.coordToColumn]
            this.updateWidthElem()
        },
        checkOneElemEnd(data){ // срабатывает при отпуске объекта
            if (Object.keys(data.to.dataset).length) // перетащили в сетку
            {
                // from
                this.coordFromRow = Object.keys(data.from.dataset).length ? Number(data.from.dataset.row) : Number(data.to.dataset.row);
                this.coordFromColumn = Object.keys(data.from.dataset).length ? Number(data.from.dataset.column) : Number(data.to.dataset.column);

                this.updateCoords(Number(data.to.dataset.row), Number(data.to.dataset.column))

                this.twoElemInOneBlock()
                if (this.toElemWidth !== 1) this.updateMove()
            }

        },
        twoElemInOneBlock(){ // если элемента в одном блоке, то мы его сбрасывает на след. строку
            if (this.toElem.items.length === 2){
                const deleteEl = this.rows[this.coordToRow][this.coordToColumn].items.splice(1, 1);
                if ( this.rows[this.rows.length-1][0].items.length){
                    this.addRow(deleteEl[0])
                } else {
                    this.addDefaultArr(deleteEl[0])
                    alert('Заполните первое поле')
                }
            }

        },
        addDefaultArr(obj){
            this.defaultArr.push(obj)
        },
        addRow(obj = false){
            if (this.rows[this.rows.length-1][0].items.length){
                if (obj.desc){
                    this.rows.push(
                        [
                            { name: 0, items: [obj] },
                            { name: 1, items: [] },
                            { name: 2, items: [] },
                            { name: 3, items: [] },
                        ]
                    )
                } else {
                    this.rows.push(
                        [
                            { name: 0, items: [] },
                            { name: 1, items: [] },
                            { name: 2, items: [] },
                            { name: 3, items: [] },
                        ]
                    )
                }
            } else {
                alert('Заполните первое поле')
            }

        },
        updateMove(){
            // не влазиет по ширине, сбросить ширину до 1
            if (!this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth -1 ]){
                this.removeNameToNull(true, true)
                this.resetWidth()
                return
            }
            // следом есть еще один объект
            if (this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth -1 ].items.length){
                this.removeNameToNull(true, true)
                this.resetWidth()
                return
            }
            // для 3рех блоков, чтобы не съело при перетаскивание на новую строку
            if (this.toElemWidth === 3 && (this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth -2 ].items.length) ){
                this.removeNameToNull(true, true)
                this.resetWidth()
                return
            }
            // для 4рех блоков, чтобы не съело при перетаскивание на новую строку
            if (this.toElemWidth === 4 && (this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth -2 ].items.length ||
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth -3 ].items.length)
            ){
                this.removeNameToNull(true, true)
                this.resetWidth()
                return
            }


            this.removeNameToNull(true)
            this.addNameToNull(true)
        },
        changeWidthElem(row, column, sign){
            this.updateCoords(row, column)
            this.validateWidthElem(sign)
        },
        validateWidthElem(sign) { // проверка перед + или -
            switch(sign) {
                case '+':
                    // есть ли объект дальше по массиву в строке
                    if (!this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth ]){
                        return;
                    }
                    //  есть ли место в последующем объекте
                    if (this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth ].items.length){
                        return;
                    }

                    this.increaseWidthElem();
                    this.addNameToNull();
                    break
                case '-':

                    // нельзя уменьшить при ширине = 1
                    if (this.toElemWidth === 1){
                        return;
                    }

                    this.reduceWidthElem();
                    this.removeNameToNull();
                    break
            }
        },
        forThreeElWidth(){
            this.rows[this.coordFromRow][this.coordFromColumn + this.toElemWidth - 1 ].name = this.coordFromColumn + this.toElemWidth - 1
            this.rows[this.coordFromRow][this.coordFromColumn + this.toElemWidth - 2].name = this.coordFromColumn + this.toElemWidth -2
        },
        removeNameToNull(move, reset = false) {
            // reset
            if (reset){
                if (this.toElemWidth === 3){  // если 3, берем элемент и закрываем 2 прошлых
                   this.forThreeElWidth()
                }
                else if(this.toElemWidth === 4){  // если 3, берем элемент и закрываем 3 прошлых
                    this.forThreeElWidth()
                    this.rows[this.coordFromRow][this.coordFromColumn + this.toElemWidth -3].name = this.coordFromColumn + this.toElemWidth -3
                }
                else {
                    this.rows[this.coordFromRow][this.coordFromColumn + this.toElemWidth - 1 ].name = this.coordFromColumn + this.toElemWidth -1
                }
                //this.debag()
            }
            if (move && this.toElemWidth === 4){  // перетащиил и 4 элемента
                this.forThreeElWidth()
                this.rows[this.coordFromRow][this.coordFromColumn + this.toElemWidth -3].name = this.coordFromColumn + this.toElemWidth -3
            }
            if (move && this.toElemWidth === 3){  // перетащиил и 3 элемента
                this.forThreeElWidth()
            }
            // перетащиил
            if (move){
                this.rows[this.coordFromRow][this.coordFromColumn + this.toElemWidth -1 ].name = this.coordFromColumn + this.toElemWidth -1
            }
            // нажали кнопку
            else {
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth ].name = this.coordToColumn + this.toElemWidth
            }
           // this.debag()
        },
        addNameToNull(move = false){
            // перетащиил и 4 элемента
            if (move && this.toElemWidth === 4){
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth-1 ].name = null
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth-2 ].name = null
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth-3 ].name = null
            }
            // перетащиил и 3 элемента
            if (move && this.toElemWidth === 3){
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth-1 ].name = null
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth-2 ].name = null
            }
            // перетащиил
            if (move){
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth-1 ].name = null
            }
            // нажали кнопку
            else {
                this.rows[this.coordToRow][this.coordToColumn + this.toElemWidth-1 ].name = null
            }
             this.debag()
        },
        increaseWidthElem(){ // +
            this.rows[this.coordToRow][this.coordToColumn].items[0].width += 1
            this.updateWidthElem()
        },
        reduceWidthElem(){ // -
            this.rows[this.coordToRow][this.coordToColumn].items[0].width -= 1
            this.updateWidthElem()
        },
        resetWidth(){ // reset
            this.rows[this.coordToRow][this.coordToColumn].items[0].width = 1;
            this.updateWidthElem()
        },
        debag(){
            console.log('---START---')
            this.rows.forEach((row,idx) => {
                console.log(`-- ${idx++} --`)
                row.map(el =>{
                    console.log(el.name)
                })
            })
            console.log('---END---')
        },
    },
}
