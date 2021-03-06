// This file is the central Vue stack code
// You will need to update this file in order to register
// new page components with the router, or when you want
// to make data model changes by extending the store


// Vuex global application store and state manager
// See https://vuex.vuejs.org/en/intro.html for more info
// This global store ensures that all of your app pages can
// share data, but in a controlled and safe way
const __VueZenStore = new Vuex.Store({
	state: {
		list: [],
		vuex_init: true,
		persistence: {
			directory: "wgt-private",
			name: "vue_zen.json"
		}
	},
	getters: {
		list_length: function(state) {return state.list.count;},
		init: function(state) {return state.vuex_init;}
	},
	mutations: {
		add_list_item: function(state, item) {state.list.push(item);}
	}
});

// VueRouter page to route manager
// Allows for multi-page apps with easy view transitions and back button integration
// See https://router.vuejs.org/en/ for more information
const __VueZenRouter = new VueRouter({routes: __VueZenRoutes});

// The top level Vue app. Mounted to #app-mount in index.html
// integrates with VueRouter and Vuex, allowing all
// child page components to share them
// See https://vuejs.org/v2/guide/ for more info
// Also handles top level events available to all pages
import { createRequire } from 'module';
const __VueZenApp = new Vue({
	el: "#app-mount",
	store: __VueZenStore,
	router: __VueZenRouter,
	data: function() {
		return {
			backButtonHandler: {},
			batteryMonitor: new VueZen.BatteryMonitor({watchLevel: 0.2, exitLevel: 0.1}),
			rotaryHandler:  new VueZen.RotaryHandler()
		}
	},
	methods: {
		loadStateFile: function() {
			//TODO: Load the vuex state from a file
		},
		saveStateFile: function() {
			//TODO: Save the vuex state from a file
		}
	},
	mounted: function() {
		createRequire('dotenv').config();
		this.backButtonHandler = new VueZen.BackButtonHandler(this.$router);
		this.rotaryHandler.initPageScroller();		
	}
});

