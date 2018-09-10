import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import xml2js from 'xml2js'

let parser = new xml2js.Parser({explicitArray: false});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            name: {
                first: 'Midnight',
                last: 'Rift'
            },
            username: 'MidnightRift',
        },
        group: 'Group Name Here',
        allowedNotifications: [],
        allowedPermissions: [],
        configuration: {},
        selectedGroupIndex: 0,
        configDirtyBool: false
    },
    getters: {
        getSelectedGroupIndex(state) {
            return state.selectedGroupIndex;
        }
    },
    mutations: {
        setAllowedNotifications: function (state, payload) {
            Vue.set(state, 'allowedNotifications', payload);
        },
        setAllowedPermissions: function (state, payload) {
            Vue.set(state, 'allowedPermissions', payload);
        },
        setConfiguration: function (state, payload) {
            Vue.set(state, 'configuration', payload);
        },
        setSelectedGroupIndex: function (state, payload) {
            console.log('WTF IM GETTING CALLED')
            Vue.set(state, 'selectedGroupIndex', payload);
        },
        setConfigDirtyBool: function (state,payload) {
            Vue.set(state, 'configDirtyBool', payload);
        }
    },
    actions: {
        getNotifications(context) {
            return axios.get('cfg/groupNotifications').then(function (res) {
                parser.parseString(res.data, function (err, res2) {
                    context.commit('setAllowedNotifications', res2.GroupNotifications.Notifications);
                });

            })
        },
        getPermissions(context) {
            return axios.get('cfg/groupPermissions').then(function (res) {
                parser.parseString(res.data, function (err, res2) {
                    context.commit('setAllowedPermissions', res2.GroupPermissions.Permissions);
                });
            })
        },
        getConfiguration(context) {
           return axios.get('cfg/Configuration.xml').then(function (res) {
                //return res;
            }, function (err) {
                if (err.response.status == 404) {
                    return axios.get('cfg/Configuration.xml.default').then(function (res) {
                        return res;
                    });
                }
            }).then(function (res) {
                parser.parseString(res.data, function (err, res2) {
                    if (typeof res2.Configuration.Groups.Group === 'object' && !Array.isArray(res2.Configuration.Groups.Group) ) {
                        res2.Configuration.Groups.Group = [res2.Configuration.Groups.Group]
                    }
                    if (typeof res2.Configuration.StartLocations.StartLocation === 'object' && !Array.isArray(res2.Configuration.StartLocations.StartLocation) ) {
                        res2.Configuration.StartLocations.StartLocation = [res2.Configuration.StartLocations.StartLocation]
                    }
                    context.commit('setConfiguration', res2);
                });
            })
        },
        updateSelectedGroupIndex: function (context, payload) {
            context.commit('setSelectedGroupIndex', payload);
        },
        updateConfigDirtyBool: function (context,payload) {
            context.commit('setConfigDirtyBool', payload);
        }
    }
})
