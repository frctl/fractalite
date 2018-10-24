import './styleguide.scss';
import { iframeResizer } from 'iframe-resizer';
// import * as hljs from 'highlightjs';
import $ from 'jquery';

const iframes = iframeResizer();
// hljs.initHighlightingOnLoad();

const variants = $('.variant');

if (variants.length) {
  variants.each(function() {
    const variant = $(this);
    const toggles = variant.find('.variant__toggle');
    const panels = variant.find('.variant__panel');
    toggles.on('click', function() {
      iframes.forEach(iframe => iframe.iFrameResizer.resize());
      const toggle = $(this);
      const target = variant.find(toggle.attr('href'));
      toggles.removeClass('is-active');
      toggle.addClass('is-active');

      panels.hide();
      target.show();

      return false;
    });
    toggles.first().trigger('click');
  });
}
