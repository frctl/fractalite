<div class="fr-search">
  <div class="fr-search__input-wrapper">
    <input type="text" class="fr-search__input" v-model="searchTerm" placeholder="Search components..." v-on:keyup.escape="resetSearch()">
    <span class="fr-search__cancel" v-if="isActive" @click="resetSearch()">×</span>
  </div>
  <div class="fr-search__results" v-if="isActive">
    <div class="fr-search__none" v-if="results.length === 0">
      No matching components
    </div>
    <ul class="fr-search__components" v-else>
      <li v-for="component in results" class="fr-search__component">
        <span v-html="component.label" class="fr-search__label"></span>
        <ul class="fr-search__scenarios">
          <li v-for="scenario in component.scenarios" class="fr-search__scenario">
            <router-link :to="scenario.url" v-html="scenario.label" class="fr-search__link"></router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
