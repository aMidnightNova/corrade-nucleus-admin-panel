<template>
    <v-container fluid>
        <v-layout column align-center>
            <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
            <blockquote>
                &#8220;Potato's are a necessity in life, right up there with tickles.&#8221;
                <footer>
                    <small>
                        <em>&mdash;Midnight Rift</em>
                    </small>
                </footer>
            </blockquote>
        </v-layout>
        <div>{{this.$store.state.allowedNotifications}}</div>
        <br>
        <div>{{this.$store.state.allowedPermissions}}</div>
        <br>
        <div>{{this.$store.state.configuration}}</div>
    </v-container>

</template>


<script>
    export default {
        name: 'Dashboard',
        data () {
            return {
                place: null,
                allowedNotifications: this.$store.state.allowedNotifications
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
