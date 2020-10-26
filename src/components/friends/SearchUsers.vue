<template>
  <div>
    {{ indexName }}
    <ais-instant-search :search-client="searchClient" :index-name="indexName">
      <ais-search-box />
      <ais-hits :escape-HTML="true">
        <ul slot-scope="{ items }">
          <li
            v-for="item in items"
            :key="item.objectID"
            @click="selectUser(item)"
          >
            <ais-highlight :hit="item" attribute="userName" />
          </li>
        </ul>
      </ais-hits>
      <ais-configure
        :attributesToSnippet="['userName']"
        snippetEllipsisText="[…]"
      />
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";

const algoliaClient = algoliasearch(
  process.env.VUE_APP_ALGOLIA_APPLICATIONID,
  process.env.VUE_APP_ALGOLIA_APIKEY
);

const searchClient = {
  async search(requests) {
    // change conditional if any of the other facets are faked"
    if (requests.every(({ params: { query } }) => Boolean(query) === false)) {
      return {
        results: requests.map((params) => {
          // fake something of the result if used by the search interface
          return {
            processingTimeMS: 0,
            nbHits: 0,
            hits: [],
            facets: {},
          };
        }),
      };
    }
    return algoliaClient.search(requests);
  },
  async searchForFacetValues(requests) {
    return algoliaClient.searchForFacetValues(requests);
  },
};
export default {
  name: "SearchUsers",
  data() {
    return {
      searchClient,
      indexName: process.env.VUE_APP_ALGOLIA_USERINDEX,
    };
  },
  methods: {
    selectUser(user) {
      this.$router.push({ path: `/tips/${user.userName}` });
    },
  },
};
</script>
