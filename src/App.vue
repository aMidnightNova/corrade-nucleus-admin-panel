<template>
    <v-app light v-if="!loader">
        <v-dialog v-model="loader" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    Please hold, receiving data stream.
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

        <template v-if="!loader">

            <v-navigation-drawer stateless app value="ture" dark>
                <v-list expand class="pa-0">

                    <v-list-tile avatar class="grey darken-4 " style="height: 64px; padding-top: 5px">
                        <v-list-tile-avatar>
                            <img src="http://midnight.myvr.fun/images/Midnight_Rift.png">
                        </v-list-tile-avatar>
                        <v-list-tile-content v-if="userName" >
                            <v-list-tile-title>{{userName}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>


                    <div v-for="(item, i) in menu" :key="i">

                        <v-list-tile v-if="!item.category" v-bind:to="item.route" exact>

                            <v-list-tile-action>

                                <v-icon>{{item.icon}}</v-icon>

                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>

                        </v-list-tile>


                        <v-list-group v-if="item.category" no-action>
                            <v-list-tile slot="activator">
                                <v-list-tile-action>

                                    <v-icon>{{item.icon}}</v-icon>

                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>

                            <v-list-tile v-for="(item, i) in item.items" :key="i" v-bind:to="item.route" no-action
                                         class="grey darken-4">
                                <v-list-tile-action>

                                    <v-icon>{{item.icon}}</v-icon>

                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>


                        </v-list-group>

                    </div>


                </v-list>
            </v-navigation-drawer>


            <v-toolbar app fixed flat class="blue lighten-2">
                    <v-layout row  style="margin-top: 12px">
                        <v-flex xs12 md4>
                            <v-select :items="this.$store.state.configuration.Configuration.Groups.Group"  label="Current Group"
                                      v-model="selectedGroup" item-text="Name" item-value="Name" >
                            </v-select>
                        </v-flex>
                    </v-layout>




                <v-spacer></v-spacer>
                <v-toolbar-title fixed v-text="this.$store.state.selectedGroupIndex"></v-toolbar-title>


            </v-toolbar>


            <v-content>
                <router-view/>
            </v-content>
            <v-footer app flat class="blue lighten-2">
                <span style="margin-left: 20px">Made with <v-icon  style="font-size: 18px;">favorite</v-icon> by Midnight</span>
            </v-footer>
        </template>

    </v-app>
</template>

<script>
    export default {

        data() {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                selectedGroup: '',
                loader: true,

                menu: [
                    {title: 'Dashboard', category: false, icon: 'dashboard', route: '/', fa: false},
                    {title: 'Query Builder', category: false, icon: 'code', route: '/query-builder', fa: false},
                    {title: 'Configurator', category: false, icon: 'settings', route: '/configurator', fa: false},
                    // {
                    //     title:'Stats',
                    //     category: true,
                    //     icon: 'dashboard',
                    //     items: [
                    //         {icon: 'image', title: 'Second Life', route: '/'+this.$store.state.group+'/stats/Second Life', fa: true},
                    //         {icon: 'image', title: 'High Fidelity', route: '/'+this.$store.state.group+'/stats/High Fidelity', fa: true}
                    //     ]
                    // },
                    // {
                    //     title:'Lists',
                    //     category: true,
                    //     icon: 'dashboard',
                    //     items: [
                    //         {icon: 'image', title: 'Bans', route: '/'+this.$store.state.group+'/lists/bans', fa: true},
                    //         {icon: 'image', title: 'Visits', route: '/'+this.$store.state.group+'/lists/visits', fa: true}
                    //     ]
                    // },
                    // {title:'Tracker', category: false, icon: 'dashboard', route: '/'+this.$store.state.group+'/tracker', fa: false},
                ],
                miniVariant: false,
                right: true,

                title: '',
                userName: '',
                reactive: true

            }
        },
        computed: {
            // title: function() {
            //     return this.$store.state.group;
            // },
            // userName: function() {
            //     return this.$store.state.configuration.Configuration.FirstName + ' ' + this.$store.state.configuration.Configuration.LastName;
            // },
            // selectedGroup: function() {
            //     return this.$store.state.configuration.Configuration.Groups.Group[this.$store.state.selectedGroupIndex].Name;
            // },
        },
        watch: {
            selectedGroup: function (newVal, oldVal) {
                let index = this.$store.state.configuration.Configuration.Groups.Group.map(function(obj) { return obj.Name; }).indexOf(newVal);
                // var index = this.$store.state.configuration.Configuration.Groups.Group.findIndex(function(val) {
                //     return val.Name === newVal
                // });
                this.$store.dispatch('updateSelectedGroupIndex', index)
            }
        },
        mounted() {
            let self = this;
            this.$store.dispatch('getNotifications');
            this.$store.dispatch('getPermissions');

            this.$store.dispatch('getConfiguration').then(function () {
                self.title = self.$store.state.group;
                self.userName = self.$store.state.configuration.Configuration.FirstName + ' ' + self.$store.state.configuration.Configuration.LastName;
                self.selectedGroup = self.$store.state.configuration.Configuration.Groups.Group[self.$store.state.selectedGroupIndex].Name;
                setTimeout(function () {
                    self.loader = false;
                },200)

            });



            //this.$set(this, this.userName, )
        },
        name: 'App'
    }
</script>
