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
                    v-for="(el, idx) in row"
                    v-if="el.name !== null"

                    :key="idx"
                    :list=" el.items "
                    group="inputs"
                    ghost-class="ghost"
                    class="row"
                    style="border: 1px solid red; padding: 20px; display: inline-block "

                    :class=" el.items[0] ? 'width_'+ el.items[0].width : '' "

                    :data-column="el.name"
                    :data-row="idxRow"

                    @end="checkOneElemEnd"
                >
                    <div
                        v-if="el.items.length"
                        class="elem"
                        style="display: flex; justify-content: space-between"

                    >
                        <span>{{ el.items[0].width }} ) </span>
                        <span>{{ idxRow }} - {{ el.name }}</span>
                        <span>{{ el.items[0].desc }}</span>
                        <div style="display: flex">
                            <button @click="changeWidthElem(Number(idxRow), Number(el.name), '-')"> < </button>
                            <button @click="changeWidthElem(Number(idxRow), Number(el.name), '+')"> > </button>
                        </div>
                    </div>
                </draggable>
            </div>

           <div style="display: flex; justify-content: center">
               <button
                       @click="addRow"
                       class="addRow"
                       v-if="defaultArr.length"
               >
                   addRow
               </button>
<!--               <button-->
<!--                       @click="getJson"-->
<!--                       class="addRow"-->
<!--               >-->
<!--                   getJson-->
<!--               </button>-->
           </div>

        </div>
    </div>
</template>

<script src="./app.js"></script>

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
