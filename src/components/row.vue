<template>
    <draggable
            :list="rowArrow"
            ghost-class="ghost"
            @change="eventMove"
            class="row"
    >
        <div v-for="(el, idx) in rowArrow" :key="idx">
            <span class="elem">  {{ el.name }}</span>
        </div>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        name: "row",
        components: {
            draggable
        },
        data: () => ({
            rowArrow: [{name: 12}]
        }),
        methods: {
            eventMove(){

            }
        }
    }
</script>