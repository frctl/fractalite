<ul class="fr-nav__items" :data-level="depth">
  <li v-for="item in items">
    <app-link :to="item.url" v-if="item.url" class="fr-nav__link">
      <span class="fr-nav__label" v-html="item.label"></span>
    </app-link>
    <span class="fr-nav__toggle" v-else>
      <span class="fr-nav__label" v-html="item.label"></span>
    </span>
    <navigation :pages="item.children" :depth="depth + 1" v-if="item.children"></navigation>
  </li>
</ul>
