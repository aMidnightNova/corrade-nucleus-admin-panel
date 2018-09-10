<template>
    <v-container fluid row wrap>


        <v-layout row wrap>
            <v-flex v-for="(notification,index) in this.$store.state.allowedNotifications" :key="notification" xs6 md2 >
                <v-checkbox v-model="groupNotifications"  style="padding: 0; margin: 0;"  :value="notification"  :label="notification"  ></v-checkbox>
            </v-flex>
        </v-layout>

    </v-container>

</template>

<script>
    export default {
        name: 'Configurator',
        data() {
            return {
                place: null,
                reactive: true,
                groupNotifications: []
            }
        },
        computed: {
            _selectedGroupIndex: function () {
                return this.$store.state.selectedGroupIndex
            }
        },
        watch: {
            _selectedGroupIndex: function () {
                this.groupNotifications = this.$store.state.configuration.Configuration.Groups.Group[this._selectedGroupIndex].Notifications.Notification
            }
        },
        mounted() {
            this.groupNotifications = this.$store.state.configuration.Configuration.Groups.Group[this._selectedGroupIndex].Notifications.Notification

        },
        methods: {

        }
    }
</script>


<style scoped>

</style>
