<template>
    <div>HomePage</div>
    <div>{{count}}</div>
    <button @click="count++">ADD</button>
</template>

<script>
import { useCount } from '@/composables/count';
export default {
    setup() {
        const { count } = useCount();
        console.log(count);

        return {
            count,
        }
    }

}
</script>

<style>

</style>