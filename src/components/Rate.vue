<template>
    <div class="rating">
        <div
            v-for="(star, index) in 5"
            :key="star"
            class="rating__star"
            :class="{ 'rating__star--selected': index < rating}"
            @click="setNeededRating(index + 1)"
        />
    </div>
</template>
<script>
export default {
name: 'Rate',
props: {
  rating: {
    default: 0,
    type: Number,
  },
},
methods: {
  setNeededRating(mark) {
    console.log(mark);
    this.$emit("change", mark === this.rating ? 0 : mark);
  },
},
};
</script>
<style lang="scss">
    .rating {
        display: flex;
        width: 200px;
        justify-content: space-between;
        margin-left: 20px;

        &__star {
            width: 30px;
            height: 30px;
            background-color: #ccc;

            &--selected {
                background-color: red;
            }
        }
    }
</style>
