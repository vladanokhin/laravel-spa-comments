<template>
    <div class="w-25 mt-5">
        <div class="mb-3">
            <input type="text" v-model="name" class="form-control" id="name" placeholder="Name">
        </div>
        <div class="mb-3">
            <input type="text" v-model="job" class="form-control" id="job" placeholder="Job">
        </div>
        <div class="mb-3">
            <input type="number" v-model="age" class="form-control" id="Age" placeholder="age">
        </div>
        <div class="mb-3">
            <button @click.prevent="addPerson" class="btn btn-outline-primary">Create Person</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            age: null,
            job: null,
        }
    },
    methods: {
         addPerson() {
             axios.post('api/person', {name: this.name, age: this.age, job: this.job})
                 .then(response => console.log(response))
                 .catch(error => console.log(error))
         }
    }
}
</script>

<style scoped>

</style>
