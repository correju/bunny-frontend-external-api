<template>
  <section>
    <v-container>
      <v-layout row wrap>
          <v-flex xs12>
            <h1>{{title}}</h1>
            <p>Please add a search word</p>
          </v-flex>
          <v-flex xs12 class="search-wrapper">
              <v-text-field
                name="keyword"
                label="search keword"
                v-model="keyword"
                class="input-group--focused"
              ></v-text-field>
              <v-btn v-on:click.native="search" class="primary no-left-margin">Go</v-btn>
          </v-flex>
          <v-flex xs12 mt-15>
            <!-- Results List -->
            <v-card v-if="searchResults">
              <v-list>
                <template v-for="(item, index) in searchResults">
                  <v-list-tile :key="item.id">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ item.overview }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile :key="item.id + '-action'" class="action-wrapper">
                    <v-list-tile-action>
                      <v-btn :disabled="disabled" v-on:click.native="saveProject(item.title, item.overview)" class="primary no-left-margin">use as script</v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider :key="item.id + 'separator'" v-if='validate(index)'></v-divider>
                </template>
              </v-list>
            </v-card>
            <!-- end results list-->
          </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Successfully created project</v-card-title>
            <v-card-text>
              <p>This is the id of your project <strong>{{projectId}}.</strong><br />Please copy this id and check the state on the projects page</p></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click.native="dialog = false">ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
      <v-layout row justify-center>
        <v-dialog v-model="errorDialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Error</v-card-title>
            <v-card-text>
              <p>There was a problem creating the project</p></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click.native="errorDialog = false">ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: 'Home page',
      keyword: null,
      searchResults: null,
      disabled: false,
      dialog: false,
      errorDialog: false,
      projectId: null,
    };
  },
  methods: {
    search() {
      axios.get('/movies', {
        params: {
          searchWord: this.keyword,
        },
      }).then((res) => {
        this.searchResults = res.data.filter(e => e.overview !== '' && e.title !== '');
      }).catch(() => {
      });
    },
    validate(index) {
      return index < (this.searchResults.length - 1);
    },
    checkOverView(overview) {
      if (overview) {
        return overview;
      }
      return 'OVERVIEW IS EMPTY';
    },
    saveProject(title, overview) {
      this.disabled = true;
      axios.post('/projects', {
        title,
        overview,
      })
        .then((res) => {
          this.disabled = false;
          this.projectId = res.data.project.id;
          this.dialog = true;
        })
        .catch((e) => {
          this.disabled = false;
          this.errorDialog = true;
        });

    },
  },
};
</script>

<style lang="less" scoped>
  .no-left-margin{
    margin-left: 0;
  }
  .search-wrapper{
    margin-bottom: 15px;
  }
  .action-wrapper{
    margin-bottom: 15px;
  }
</style>

