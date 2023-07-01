<template>
    <div class="p-5">
        <CreatePersonComponent></CreatePersonComponent>
    </div>
</template>

<script>
import CreatePersonComponent from "@src/components/CreatePersonComponent";
export default {
    name: "App",
    data() {
        return {
            item: 0,
        }
    },
    components: {
        CreatePersonComponent
    }
}
</script>

<style scoped>

</style>
