<template>
  <section>
    <v-container>
      <v-layout row wrap>
          <v-flex xs12>
            <h1>{{title}}</h1>
            <p>Please search project</p>
          </v-flex>
          <v-flex xs12 class="search-wrapper">
              <v-text-field
                name="keyword"
                label="Project id"
                v-model="projectId"
                class="input-group--focused"
              ></v-text-field>
              <v-btn v-on:click.native="getProject" class="primary no-left-margin">Go</v-btn>
          </v-flex>
          <v-flex xs12 mt-15>
            <!-- Results List -->
            <v-card v-if="project">
              <v-list>
                <v-list-tile >
                  <v-list-tile-content>
                    <v-list-tile-title>{{ project.title }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ project.script }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile  class="action-wrapper" v-if="audioPresent">
                  <v-list-tile-action>
                    <audio controls>
                      <source :src="mp3" type="audio/mp3">
                    </audio>
                  </v-list-tile-action>
                </v-list-tile>
                <v-list-tile  class="action-wrapper" v-if="!audioPresent">
                  <v-list-tile-action>
                    Audio not Ready!
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card>
            <!-- end results list-->
          </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: 'Search for project',
      projectId: null,
      project: null,
      audio: null,
      mp3: null,
    };
  },
  methods: {
    getProject() {
      axios.get(`/projects/${this.projectId}`, {
        params: {
          projectId: this.projectId,
        },
      }).then((res) => {
        this.mp3 = null;
        this.project = res.data.projects[0];
        if (this.project.reads && this.project.reads.length > 0) {
          const urls = this.project.reads[0].urls;
          console.log(urls);
          this.mp3 = urls[Object.keys(urls)[0]].default;
          this.audioPresent = this.mp3.indexOf('.mp3') > -1;
        }
        console.log(this.project);
      }).catch(() => {
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

