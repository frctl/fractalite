<split-pane class="fr-preview" :elements="['#preview-wrapper', '#preview-spacer']" direction="horizontal" :min-size="[280, 0]" :sizes="[100, 0]">
  <div id="preview-wrapper" class="fr-preview__wrapper">
    <iframe :srcdoc="srcdoc" :src="src" frameborder="0" ref="window" class="fr-preview__window"></iframe>
  </div>
  <div id="preview-spacer" class="fr-preview__spacer"></div>
</split-pane>
