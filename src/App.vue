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
                 v-for="(column, idx) in columns"
                 :key="idx">
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
                    <div v-for="(item, idx) in el.items"
                         :key="idx"
                         class="elem" style="display: flex; justify-content: space-between"
                    >
                        <span>{{ item.desc }}</span>

                        <draggable @unchoose="resetWidthElem">
                            <button> > </button>
                        </draggable>
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
                    { name: 1, items: [] },
                    { name: 2, items: [] },
                    { name: 3, items: [] },
                    { name: 4, items: [] },
                ]
            ],
            statusAddRow: false,
        }),
        watch: {
            // columns(){
            //     // console.log(this.columns);
            // }
        },
        mounted() {
            this.defaultArr = json.BlockpageSearcher.fields

            // console.log(json.BlockpageSearcher.fields)
            // for (let i = 0; i < 5; i++){
            //     this.defaultArr.push({name: 'potap_'+  Math.floor(Math.random() * 1000)})
            // }
        },
        methods: {
            onDrop(){
            // //     console.log(data, 'onDrop')
            },
            checkOneElemStart(){
            //     console.log(data, 'checkOneElemStart')
            },
            checkOneElemEnd(data){
                console.log(data)
                if (data.to.childElementCount === 2){
                    this.statusAddRow = true;
                }

                // console.log(data, 'checkOneElemEnd')
            },
            checkOneElemChange(data) {
                if (data.added){
                    // console.log(data.added)
                    if (this.statusAddRow){
                        this.addRow(data.added.element)

                        // console.log(this.columns)
                        this.columns.forEach(column => {
                            column.forEach(el => {
                                if (el.items.length === 2){
                                    el.items.splice(1, 1)
                                }
                            })
                        })
                    }
                    // console.log(data, 'added')
                }
                // if (data.removed){
                //     // console.log(data, 'removed')
                // }
            },
            addRow(obj){
                if ( this.columns[this.columns.length - 1 ][0].items.length ){


                    if (obj.desc){
                        // console.log(obj)
                        this.columns.push([
                            { name: 1, items: [obj] },
                            { name: 2, items: [] },
                            { name: 3, items: [] },
                            { name: 4, items: [] }
                        ])
                    } else {
                        this.columns.push([
                            { name: 1, items: [] },
                            { name: 2, items: [] },
                            { name: 3, items: [] },
                            { name: 4, items: [] }
                        ])
                    }

                    // console.log(this.columns)
                } else {
                    alert('Заполните первое поле')
                }
            },
            resetWidthElem(data){
                console.log(data, 'resetWidthElem')
                // const width = data.path[1].style.width;
                //
                // data.path[1].style.width = width + 10
                // console.log(data.path[1].style.width += 10 +'px' )
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
