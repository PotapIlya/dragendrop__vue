<template>
    <div class="row" style="display: flex">

        <row
                v-for="(item, idx) in countRow"
                :key="idx"
                :list1="list1"
        />

    </div>
</template>
<script>
    import row from './components/row'
    export default {
        name: "two-lists",
        display: "Two Lists",
        order: 1,
        components: {
            row
        },
        data() {
            return {
                countRow: [1, 1],
                list1: [
                    { name: "John", id: 1 },
                    { name: "Joao", id: 2 },
                    { name: "Jean", id: 3 },
                    { name: "Gerard", id: 4 }
                ],

            };
        },
        methods: {
            add: function() {
                this.list.push({ name: "Juan" });
            },
            replace: function() {
                this.list = [{ name: "Edgard" }];
            },
            clone: function(el) {
                return {
                    name: el.name + " cloned"
                };
            },
            log: function(evt) {
                window.console.log(evt);
            }
        }
    };
</script>