<template>
    <div class="Collections bigBox">
        <CollectionHead @parentMethod="initChild"></CollectionHead>
        <CollectionEditAll ref="CollectionEditAll" @parentMethod="initChild"></CollectionEditAll>
        <CollectiontList ref="CollectiontList"></CollectiontList>
    </div>
</template>

<script>
import * as base from '../../assets/js/base'
import CollectionEditAll from "./CollectionEditAll";
import CollectiontList from "./CollectiontList";
import CollectionHead from './CollectionHead.vue';

export default {
    name: "Collections",
    data() {
        return {
        }
    },
    components: {
        CollectionHead,
        CollectionEditAll,
        CollectiontList
    },
    mounted() {
    },
    methods:{
        initChild(name){
             this.$refs.CollectionEditAll.init(name);
             this.$refs.CollectiontList.init(name);
        }
    }
}

</script>