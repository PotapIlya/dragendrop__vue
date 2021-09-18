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
                 v-for="(column, idxColumn) in columns"
                 :key="idxColumn">
                <draggable
                    style="border: 1px solid red; padding: 20px; display: inline-block "
                    v-for="(el) in column"
                    :key="el.name"
                    :list="el.items"
                    group="inputs"
                    ghost-class="ghost"
                    class="row"

                    @change="checkOneElemChange"
                    @end="checkOneElemEnd"
                    @start="checkOneElemStart"


                >
                    <div v-for="(item, idxRow) in el.items"
                         :key="idxRow"
                         class="elem"
                         :class=" 'width_'+ item.width"
                         style="display: flex; justify-content: space-between"
                    >
                        <span>{{ item.width }}</span>
                        <span>{{ item.desc }}</span>
                        <button @click="resetWidthElem(idxColumn, el)"> > </button>
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
            columns: [
                [
                    { name: 0, items: [] },
                    { name: 1, items: [] },
                    { name: 2, items: [] },
                    { name: 3, items: [] },
                ]
            ],
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
            checkOneElemEnd(){
                // console.log(data)
                // if (data.to.childElementCount === 2){
                //     this.statusAddRow = true;
                // }

                // console.log(data, 'checkOneElemEnd')
            },
            checkOneElemChange(data) {
                if (data.added){
                    //
                }
            },
            addRow(obj){
                if ( this.columns[this.columns.length - 1 ][0].items.length ){

                    if (obj.desc){
                        // console.log(obj)
                        this.columns.push([
                            { name: 0, items: [obj] },
                            { name: 1, items: [] },
                            { name: 2, items: [] },
                            { name: 3, items: [] }
                        ])
                    } else {
                        this.columns.push([
                            { name: 0, items: [] },
                            { name: 1, items: [] },
                            { name: 2, items: [] },
                            { name: 3, items: [] }
                        ])
                    }

                    // console.log(this.columns)
                } else {
                    alert('Заполните первое поле')
                }
            },
            resetWidthElem(row, column){
                // console.log(row, column.name)
                // console.log(
                //     this.columns[row][column.name].items[0].desc
                // )

                this.columns[row].splice( column.name+1, 1)
                console.log(
                    this.columns[row][column.name].items[0].width += 1
                )


                // console.log(this.columns)
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
    .row{
        min-height: 30px;
        display: flex;
        width: 25%;
    }
</style>
