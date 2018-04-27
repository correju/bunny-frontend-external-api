<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" persistent enable-resize-watcher fixed temporary>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.id" :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click.stop="sideNav = !sideNav">
      </v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span">
        <div class="logo-wrapper">
          <img src="./assets/bunnyPa.png" alt="bunnyPA">
        </div>
        </router-link >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.id" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        {
          id: 4, icon: 'business_center', title: 'Projects', link: '/Projects',
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
  .logo-wrapper{
    max-width: 100px;
    height: 100%;
    display: flex;
    flex-flow: column;
    & > img {
      width: 100%;
      height: auto;
    }
  }
</style>
<style>
  @import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons';
</style>
