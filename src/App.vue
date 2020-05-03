<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-if="token" v-model="drawer" app clipped>
      <v-list dense nav>
        <v-list-item-group v-model="item" color="primary">
          <div v-for="item in items" :key="item.title">
            <!-- If Menu contains Sub Menu -->
            <v-list-group v-if="item.items" :prepend-icon="item.icon">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="subItem in item.items" :key="subItem.title">
                <v-list-item-icon>
                  <v-icon v-text="subItem.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <!-- If Menu don't contains Sub Menu -->
            <v-list-item v-else>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- Application Bar -->
    <v-app-bar v-if="token" app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Hospital Apps</v-toolbar-title>
      <v-spacer />
      <div style="width:320px">
        <v-text-field
          flat
          dense
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down"
        />
      </div>
      <v-btn class="ml-1" icon @click="logout">
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Content -->
    <v-content>
      <v-container class="fill-height pa-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  data: () => ({
    drawer: null,
    item: null,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", link: "" },
      {
        title: "Master",
        icon: "mdi-database",
        items: [
          { title: "Hospital", icon: "mdi-hospital-building", link: "" },
          { title: "Doctor", icon: "mdi-account", link: "" },
          { title: "Patient", icon: "mdi-account-box", link: "" },
        ],
      },
      { title: "Setting", icon: "mdi-wrench" },
      { title: "Logout", icon: "mdi-exit-to-app" },
    ],
  }),

  methods: {
    ...mapActions(["logout"]),
  },

  computed: {
    ...mapGetters(["token"]),
  },
};
</script>

<style>
.b-red {
  border: 1px solid red;
}

.b-green {
  border: 1px solid green;
}

.b-blue {
  border: 1px solid blue;
}

.backdrop {
  height: 100%;
  background-color: var(--v-grey-lighten4);
}
</style>
