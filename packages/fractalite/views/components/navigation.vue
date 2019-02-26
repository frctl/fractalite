<ul class="fr-nav__items" :data-level="depth">
  <li class="fr-nav__item" v-for="item in items" :id="item.id" :class="{'is-open': isOpen(item.id)}">
    <app-link :to="item.url" v-if="item.url" class="fr-nav__link">
      <span class="fr-nav__label" v-html="item.label"></span>
    </app-link>
    <span class="fr-nav__toggle" @click.stop="toggleChildren(item.id)" v-else>
      <span class="fr-nav__label" v-html="item.label"></span>
    </span>
    <navigation :pages="item.children" :depth="depth + 1" v-if="item.children"></navigation>
  </li>
</ul>
