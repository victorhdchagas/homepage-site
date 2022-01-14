<template>
  <div class="bg-black-20">
    <!--Will show all my projects when open page-->
    <header class="text-wrap">
      <p class="m-auto w-75 overflow-hidden text-break">
        <vue-typer
          :type-delay="20"
          :text="msg"
          :erase-on-complete="false"
          :pre-erase-delay="5000"
          @erased="update"
        ></vue-typer>
      </p>
      <!-- <div class="description">Some amazing picture.</div> -->
    </header>
    <!--Social networks area-->
    <section class="badges d-flex justify-content-around skills">
      <img
        src="https://badgen.net/badge/icon/docker?icon=docker&label&color=black"
      />
      <img
        src="https://badgen.net/badge/icon/terminal?icon=terminal&label&color=black"
      />
      <img
        src="https://badgen.net/badge/icon/postgresql?icon=postgresql&label&color=black"
      />
      <img
        src="https://badgen.net/badge/icon/mysql?icon=mysql&label&color=black"
      />
      <img
        src="https://badgen.net/badge/icon/nodejs?icon=nodejs&label&color=black"
      />
      <img
        src="https://badgen.net/badge/icon/reactjs?icon=reactjs&label&color=black"
      />
      <img
        src="https://badgen.net/badge/icon/vuejs?icon=vuejs&label&color=black"
      />
    </section>

    <!-- First content of page. -->
    <section class="d-flex justify-content-around px-4 py-2">
      <!-- git repository card layout -->
      <div
        class="w-25 git-repo"
        v-for="(repo, $index) in last_repos"
        :key="$index"
      >
        <div
          class="
            git-logo
            bg-black-40
            text-center
            align-middle
            pt-2
            text-success text-uppercase
            rounded-top
            bolder
            position-relative
          "
        @click="navigate(repo.html_url)"
        role="button"
        >
          <span class="position-relative" v-bind:class="{'success-highlight':repo.id == selectedRepo.id}">{{ repo.name }}</span>
          <img
            v-if="repo.language"
            :src="`https://badgen.net/badge/code/${repo.language}/444?label=&scale=0.8`"
            class="position-absolute " style="right:5px;"
          />
        </div>
        <div
          class="
            h-75
            bg-black-30
            p-2
            text-break
            overflow-auto
            position-relative
            repo-description
          "
        >
          <p class="mb-0">Description:</p>
          <span class="mb-0 text-small">
            <small>{{ repo.description }}</small></span
          >

          <p>
            Home Page:
            <a :href="repo.homepage">
              {{ repo.homepage ? repo.homepage : " - " }}</a
            >
          </p>
          <footer class="blockquote-footer description text-right">
            last update at
            <cite>{{ new Date(repo.pushed_at).toLocaleString() }}</cite>
          </footer>
        </div>
      </div>
    </section>

    <!--Some descritive texts-->
    <section class="w-75 m-auto pt-3">
      <p>Welcome to my homepage.</p>
      <p>Here i want to show how i'm improving my skills in mine developer road, this is my simple portfolio with the  technologies which i'm improving this year.</p>
    </section>
    <!--Footer-->
    <footer>
        <span>Starting to develope my new 2022! We need strength to this new coming
        year.</span>
    </footer>
  </div>
</template>

<script>
import { VueTyper } from "vue-typer";
import git from "../services/git";

export default {
  name: "HelloWorld",
  data: () => {
    return {
      gitArray: [],
      msg: "here is my secret.",
      selectedRepo: {},
    };
  },
  computed: {
    last_repos: function () {
      return this.gitArray
        .sort(function (a, b) {
          return new Date(b.pushed_at) - new Date(a.pushed_at);
        })
        .slice(0, 3);
    },
  },
  components: {
    // ES6; property shorthand + Vue should automatically dasherize the key for us
    VueTyper,
  },
  methods: {
    update: async function () {
      this.selectedRepo = git.selectRandomRepo(this.gitArray);
      this.msg = git.formatGit(this.selectedRepo);
    },
    navigate: (url) => {
      window.open(url, "_blank").focus();
    },
  },
  created: async function () {
    this.gitArray = await git.getRepository();
    this.update();
  },
};
</script>

<style >
@import "../css/index.css";
vue-typer {
  white-space: pre;
}

.vue-typer .custom.char.typed {
  color: #608b69;
}
</style>
