<template>
  <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li v-if="(currentPage !== 1)" class="page-item">
            <a 
            style="cursor: pointer;" 
            class="page-link" 
            @click="onClick(currentPage - 1)"
            >
            Previous
            </a>
        </li>

        <li 
            v-for="page in numberOfPages"
            :key="page"
            :class="currentPage === page ? 'active' : ''"
            class="page-item">
            <a 
                style="cursor: pointer;" 
                class="page-link" 
                @click="onClick(page)"
                >
                {{page}}
            </a>
        </li>

        <li v-if="(numberOfPages !== currentPage)" class="page-item">
            <a 
                style="cursor: pointer;" 
                class="page-link" 
                @click="onClick(currentPage + 1)"
                >
                Next
            </a>
        </li>
        </ul>
    </nav>
</template>

<script>
import {getCurrentInstance } from 'vue';
export default {
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        numberOfPages: {
            type: Number,
            required: true,
        },
    },
    emits: ['click'],
    setup() {
        const {emit} = getCurrentInstance();
        const onClick = (page) => {
            emit('click', page);
        };

        return {
            onClick,
        }
    }
}
</script>

<style>

</style>