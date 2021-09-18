<template>
    <div class="container" style="display: flex">

        <div style="display: flex; margin-right: 20px">
            <draggable
                    group="inputs"
                    :list="defaultArr"
                    ghost-class="ghost"
                    style="border: 1px solid red; padding: 20px; "

                    @end="checkOneElemEnd"
            >
                <div v-for="(item, idx) in defaultArr" :key="idx">
                    <div class="elem" v-if="item.active">{{ item.desc }}</div>
                </div>
            </draggable>
        </div>

        <div style="width: 100%">

            <div
                    style="display: flex"
                    v-for="(row, idxRow) in rows"
                    :key="idxRow">
                <draggable
                        style="border: 1px solid red; padding: 20px; display: inline-block "

                        v-for="(el, idx) in row"
                        v-if="el.name !== null"

                        :key="idx"
                        :list=" el.items "
                        group="inputs"
                        ghost-class="ghost"
                        class="row"



                        :data-column="el.name"
                        :data-row="idxRow"

                        :class=" el.items[0] ? 'width_'+ el.items[0].width : '' "

                        @change="checkOneElemChange"
                        @end="checkOneElemEnd"

                >
                    <div
                            v-if="el.items.length"
                            class="elem"

                            style="display: flex; justify-content: space-between"

                    >
                        <span>{{ el.items[0].width }}</span>
                        <span>{{ el.items[0].desc }}</span>
                        <div style="display: flex">
                            <button @click="validateWidthElem(false)"> < </button>
                            <button @click="validateWidthElem(true)"> > </button>
                        </div>
                    </div>
                </draggable>
            </div>

            <div style="display: flex; justify-content: center">
                <button @click="addRow" class="addRow">addRow</button>
            </div>

        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import json from './json'

    export default {
        name: 'App',
        components: {
            draggable
        },
        data: () => ({
            defaultArr: [],
            rows: [
                [
                    { name: 0, items: [] },
                    { name: 1, items: [] },
                    { name: 2, items: [] },
                    { name: 3, items: [] },
                ]
            ],
            typeChange: 'added',
            coordFromRow: null,
            coordFromColumn: null,
            coordToRow: null,
            coordToColumn: null,
        }),
        mounted() {
            this.defaultArr = json.BlockpageSearcher.fields
        },
        methods: {
            checkOneElemEnd(data){
                this.coordFromRow = Object.keys(data.from.dataset).length ? Number(data.from.dataset.row) : Number(data.to.dataset.row);
                this.coordFromColumn = Object.keys(data.from.dataset).length ? Number(data.from.dataset.column) : Number(data.to.dataset.column);
                this.coordToRow = Number(data.to.dataset.row);
                this.coordToColumn = Number(data.to.dataset.column);

                this.updateMove()
            },
            checkOneElemChange(data) {
                this.typeChange = Object.keys(data)[0]
            },
            addRow(obj){
                // this.rows.push([
                //     { name: 0, items: [] },
                //     { name: 1, items: [] },
                //     { name: 2, items: [] },
                //     { name: 3, items: [] }
                // ])
            },
            removeNameToNull() {
                let x = 0;
                if (this.typeChange === 'removed') x = 1;

                const width = this.rows[this.coordToRow][this.coordToColumn].items[0].width-1;

                console.log(this.rows[this.coordFromRow][this.coordFromColumn].name + width)
                // console.log(
                //     this.rows[this.coordFromRow][this.rows[this.coordFromRow][this.coordFromColumn].name + width].name = width
                // )
                // берем элемент который только что открыли
                // текущая длина +1
                //
                // console.log(
                //      this.rows[this.coordFromRow][this.coordFromColumn].name + width -1, '1'
                // )


                // this.rows[row][column + (this.rows[row][column].items[0].width) - x].name = column + (this.rows[row][column].items[0].width -x)


                // this.rows[row].map(x => {
                //     console.log(x.name)
                // })
                // console.log('------')
            },
            addNameToNull(){

                this.rows[this.coordToRow][this.coordToColumn + (this.rows[this.coordToRow][this.coordToColumn].items[0].width) -1].name = null;

                // this.rows[row].slice(
                //     this.rows[row][column].name + 1,
                //     this.rows[row][column + (this.rows[row][column].items[0].width - 1)].name + 1
                // ).map(item => {
                //     item.name = null
                // })

                // this.rows[row].map(x => {
                //     console.log(x.name)
                // })
                // console.log('------')

                //при перетаскивание элемената возвращаем все name в первоначальное состояние
                // this.rows[coordToRow].map((el, idx) => {
                //     el.name = idx
                // })
                // this.rows[row].map((el, idx) => {
                //     el.name = idx
                // })
                /*
                 берем column на котормо стоит наш блок +1
                 из width получаем сколько column будет занимать наш блок
                 присваиваем name = null тем блокам, которые оказались в промежутке между начала и конца блока
               */
                // this.rows[row].reduce((app, el) => {
                //     if (el.items.length){
                //         app.push({
                //             'start': el.name,
                //             'end': el.items[0].width,
                //         })
                //     }
                //     return app;
                // }, []).map(item => {
                //
                //     this.rows[row].slice(
                //         item.start + 1,
                //         this.rows[row][column + (item.end - 1)].name + 1
                //     )
                // })
                // this.rows[row].map(el => {
                //     if (el.items.length){
                //         // console.log(
                //             this.rows[row][el.name-1 + el.items[0].width].name = null
                //         // )
                //     }
                // })
                // this.rows[row].slice(
                //     this.rows[row][column].name + 1,
                //     this.rows[row][column + (this.rows[row][column].items[0].width - 1)].name + 1
                // ).map(item => {
                //     item.name = null
                // })
                // this.debag(row)
            },
            increaseWidthElem(){
                this.rows[this.coordToRow][this.coordToColumn].items[0].width += 1
                this.addNameToNull()
                this.debag()
            },
            reduceWidthElem(){
                this.rows[this.coordToRow][this.coordToColumn].items[0].width -= 1
                // this.removeNameToNull(row, column)
                this.debag()
            },
            resetWidth(){
                this.rows[this.coordToRow][this.coordToColumn].items[0].width = 1;
                this.removeNameToNull()
                this.debag()
                console.log('RESET')
            },
            updateMove(){

                // когда блок ширинов в 2 и мы ставим его в column 3
                if (this.coordToColumn === 3){
                    // console.log(this.rows[row][column].items[0])
                    this.resetWidth();
                    return
                }




                // this.removeNameToNull()
                // this.addNameToNull()


                this.debag()
            },
            debag(){
                console.log('---START---')
                this.rows[this.coordToRow].forEach(x => {
                    console.log(x.name)
                })
                console.log('---END---')
            },
            validateWidthElem(type) {
                // type = true => '+'
                // type = false => '-'
                console.log(this.coordToRow)
                console.log(
                    this.rows[this.coordToRow]
                )
                return;
                const el = this.rows[this.coordToRow][this.coordToColumn];


                if (type){ // +
                    // если блок уже на 3 колонке
                    if (this.coordToColumn === 3){
                        return;

                        //  если блок уже на 3 к-олонк
                        // если он уже максимальной длины или минимально длины
                        if (el.items[0].width === 4 || el.items[0].width === 1){
                            return;
                        }
                    }
                    // если конка + ширина = 3
                    if (this.coordToColumn + el.items[0].width === 4){
                        return;
                    }


                    this.increaseWidthElem()
                }
                else { // -
                    if (this.rows[this.coordToRow][this.coordToColumn].items[0].width === 1){
                        return;
                    }

                    this.reduceWidthElem()
                }

                // при + может съесть правого
                // ПЕРЕПИСАТЬ УСЛОВИЯ ПОД -
            }
        },
    }
</script>

<style>
    .addRow{
        margin-top: 20px;
        font-size: 16px;
        background: green;
        color: #fff;
        padding: 10px;
        border-radius: 8px;
        border: 4px solid green;
    }
    .container{
        max-width: 1000px;
        margin: 0 auto;
    }
    .elem{
        border: 1px solid #000;
        border-radius: 6px;
        padding: 10px;
        font-size: 16px;
    }
    .row{
        min-height: 30px;
        display: flex;
        width: 25%;
    }
    .width_1{
        width: 25%;
    }
    .width_2{
        width: 50%;
    }
    .width_3{
        width: 75%;
    }
    .width_4{
        width: 100%;
    }
    .ghost{
        opacity: 0.5;
        background: #999;
        border: 1px solid #999;
    }

</style>
