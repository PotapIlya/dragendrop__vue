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
                        <button @click="resetWidthElem(idxRow, el.name)"> > </button>
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
            lastElem : {}
        }),
        mounted() {
            this.defaultArr = json.BlockpageSearcher.fields
        },
        methods: {
            onDrop(){
                // //     console.log(data, 'onDrop')
            },
            checkOneElemStart(){
                //     console.log(data, 'checkOneElemStart')
            },
            checkOneElemEnd(data){
                const coordFrom = data.from.dataset;
                const coordTo = data.to.dataset;

                // console.log(coordFrom, 'coordFrom')
                // console.log(coordTo, 'coordTo')

                // перетащили в сетку
                if ((Object.keys(coordFrom).length && Object.keys(coordTo).length) &&
                    // Перетщили на новое место
                    (coordFrom.column !== coordTo.column || coordFrom.row !== coordTo.row)
                ){

                    // когда у элемента 1 длинаа, не задействовать его, тк он не создает name = null
                    if (this.rows[coordTo.row][coordTo.column].items[0].width !== 1){
                        // у прошлого места поменять обратно нормальный name


                        // console.log(
                        //     this.rows[coordFrom.row][coordFrom.column].name
                        // )

                        // let sum = (this.rows[coordFrom.row][ Number(coordFrom.column)].name + Number(this.rows[coordTo.row][coordTo.column].items[0].width))-1
                        // this.rows[coordFrom.row][sum].name = sum


                        // console.log( this.rows[coordFrom.row][coordFrom.column].name+1)
                        // console.log(  Number(this.rows[coordTo.row][coordTo.column].items[0].width) -1 )

                        // if ((this.rows[coordTo.row][coordTo.column].items[0].width === 3 || this.rows[coordTo.row][coordTo.column].items[0].width === 2) &&
                        //     Number(coordTo.column) === 3
                        // ){
                        //     this.rows[coordTo.row][coordTo.column].items[0].width = 1;
                        // }
                        // else if (this.rows[coordTo.row][coordTo.column].items[0].width === 2 && Number(coordTo.column) !== 3) {
                        //     let sum = (this.rows[coordFrom.row][ Number(coordFrom.column)].name + Number(this.rows[coordTo.row][coordTo.column].items[0].width))-1
                        //     this.rows[coordFrom.row][sum].name = sum
                        // }
                        // else if (this.rows[coordTo.row][coordTo.column].items[0].width === 3 && Number(coordTo.column) !== 3) {
                        //     this.rows[coordTo.row].splice(
                        //         this.rows[coordFrom.row][coordFrom.column].name+1,
                        //         Number(this.rows[coordTo.row][coordTo.column].items[0].width)-1,
                        //         { name: this.rows[coordFrom.row][coordFrom.column].name+1, items: []},
                        //         { name: Number(this.rows[coordTo.row][coordTo.column].items[0].width)-1, items: []},
                        //     )
                        // }


                        this.rows[coordFrom.row].map((column, idx) => {
                            column.name = idx
                        })




                        // this.rows[coordTo.row].splice(
                        //     this.rows[coordFrom.row][coordFrom.column].name+1,
                        //     Number(this.rows[coordTo.row][coordTo.column].items[0].width)-1,
                        //     { name: this.rows[coordFrom.row][coordFrom.column].name+1, items: []},
                        //     { name: Number(this.rows[coordTo.row][coordTo.column].items[0].width)-1, items: []},
                        // )

                        this.rows[0].forEach(x => {
                            console.log(x.name)
                        })
                        console.log('--')

                        // console.log(this.rows[0].forEach())
                        // this.rows[row].splice(
                        //     this.rows[coordFrom.row][coordFrom.column].name+1,
                        //     Number(this.rows[coordTo.row][coordTo.column].items[0].width),
                        //     { name: sum, items: [] },
                        //     )


                        // console.log(this.rows[0])




                        this.resetWidthElem(Number(coordTo.row), Number(coordTo.column), true)
                    }


                }

                // console.log(this.rows)

                // console.log(data)
                // if (data.to.childElementCount === 2){
                //
                //     console.log('tes')
                //     this.addRow(this.lastElem)
                //
                //     this.rows.forEach(column => {
                //         column.forEach(el => {
                //             if (el.items.length === 2){
                //                 el.items.splice(1, 1)
                //             }
                //         })
                //     })
                // }
            },
            checkOneElemChange(data) {

                if (data.added) {
                    // console.log(data.added)
                    this.lastElem = data.added.element

                    // console.log(data.added, 'added')
                    // console.log(this.rows)

                    // this.rows.map(column => {
                    //     column.map((el, idx) => {
                    //         if (el.items.length){
                    //             console.log(el.items[0].width)
                    //         }
                    //     })
                    //     console.log('-------')
                    // })
                }
                if (data.removed) {
                    // console.log(data.removed, 'removed')
                    // this.rows.map(column => {
                    //     column.map((el, idx) => {
                    //         if (!el.items.length){
                    //             el.name = idx
                    //         }
                    //     })
                    // })

                    // console.log(this.rows)

                }


                // console.log(this.rows)

            },
            addRow(obj){
                // есть ли первый элемент в строке
                if ( this.rows[this.rows.length - 1 ][0].items.length ){

                    if (obj.desc){
                        // console.log(obj)
                        this.rows.push([
                            { name: 0, items: [obj] },
                            { name: 1, items: [] },
                            { name: 2, items: [] },
                            { name: 3, items: [] }
                        ])
                    } else {
                        this.rows.push([
                            { name: 0, items: [] },
                            { name: 1, items: [] },
                            { name: 2, items: [] },
                            { name: 3, items: [] }
                        ])
                    }
                } else {
                    alert('Заполните первое поле')
                }
            },

            resetWidthElem(row, column, drag = false){
                // console.log('----------')
                // console.log(row, column)

                let widthElem = this.rows[row][column].items[0].width
                if (drag) {
                    widthElem -= 1;
                }

                // если рядом 2 элемента и левый расширить, проверка чтобы не съел правого
                // проверяем если ли в последующем что то, если нету, расширяем
                if (this.rows[row][column+widthElem] && !this.rows[row][column+widthElem].items.length){

                    // когда расширяем, у последующего элумента name = null
                    this.rows[row].splice( column+widthElem, 1,{ name: null, items: [] })

                    // сколько еще свободных ячеек в строке
                    const emptyEl = this.rows[row].reduce((acc, el) => {
                        if (el.name !== null && el.items[0]){
                            acc -= el.items[0].width;
                            return acc
                        }
                        return acc;
                    }, 4) // 4 максимум ячеек в строке
                    // console.log(emptyEl)
                    // console.log(this.rows)
                    if (emptyEl && !drag){
                        this.rows[row][column].items[0].width += 1
                    }
                }
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
