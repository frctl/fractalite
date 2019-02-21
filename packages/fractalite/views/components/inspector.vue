<split-pane class="fr-inspector" v-if="loaded" :elements="['#inspector-preview', '#inspector-info']" direction="vertical" :min-size="200" :gutter-size="10">
  <preview id="inspector-preview" v-if="preview" :srcdoc="preview" :src="scenario.previewUrl" class="fr-inspector__preview" ref="preview"></preview>
  <div id="inspector-info" class="fr-inspector__info">
    <ul class="fr-tabs fr-inspector__tabs" v-if="panels.length > 1">
      <li class="fr-tabs__tab" :class="{ 'is-current': currentTab === i }" v-for="(panel, i) in panels">
        <a href="#" @click="selectTab(i)">{{ panel.label }}</a>
      </li>
    </ul>
    <div class="fr-panels fr-inspector__panels">
      <div
        class="fr-panels__panel"
        v-show="currentTab === i"
        v-for="(panel, i) in panels">
        <component
          :is="{ template: panel.template, props: ['scenario', 'component', 'panel', 'preview'] }"
          :scenario="scenario"
          :preview="preview"
          :component="component"
          :panel="panel"
          v-if="panel.renderClient"
        />
        <div v-html="panel.template" v-else></div>
      </div>
    </div>
  </div>
</split-pane>
