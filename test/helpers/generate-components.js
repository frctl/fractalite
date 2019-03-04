const { resolve, join } = require('path');
const { outputFile } = require('fs-extra');
const { source, html } = require('common-tags');
const { map } = require('asyncro');

const testComponentsDir = resolve(__dirname, '../fixtures/generated');

const nestedProps = JSON.stringify(
  {
    level1: {
      level2: {
        level3: {
          item1: 'foo',
          item2: 'bar',
          item3: ['foo', 'bar', 'baz']
        }
      }
    }
  },
  null,
  2
);

const svgExpand = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M7.416 9L12 13.35 16.584 9 18 10.337 12 16l-6-5.663z" fill-rule="evenodd"/></svg>`;
const svgCollapse = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path fill="#000" d="M7.416 15L6 13.663 12 8l6 5.663L16.584 15 12 10.65z" fill-rule="evenodd"/></svg>';

async function generateComponents(componentCount = 100) {
  const nums = Array.from({ length: componentCount }, (_, k) => k + 1);
  return map(nums, count => {
    const name = `component-${count}`;
    const dirPath = join(testComponentsDir, `@${name}`);
    const configContents = source`
        module.exports = {
          position: ${count},
          scenarios: [
            {
              name: 'component-${count}-1',
              props: {
                num: '${count}-1',
                collapseIcon: './collapse.svg',
                nested: ${nestedProps}
              }
            },
            {
              name: 'component-${count}-2',
              props: {
                num: '${count}-2',
                collapseIcon: './collapse.svg',
                nested: ${nestedProps}
              }
            },
            {
              name: 'component-${count}-3',
              props: {
                num: '${count}-3',
                collapseIcon: './collapse.svg',
                nested: ${nestedProps}
              }
            }
          ]
        };
      `;
    const viewContents = html`
      <div>
        <h1>Component {num}</h1>
        <img src="./expand.svg" />
        <img src="{collapseIcon}" />
      </div>
    `;
    return Promise.all([
      outputFile(join(dirPath, `${name}.config.js`), configContents),
      outputFile(join(dirPath, `view.html`), viewContents),
      outputFile(join(dirPath, `expand.svg`), svgExpand),
      outputFile(join(dirPath, `collapse.svg`), svgCollapse)
    ]);
  });
}

(async () => {
  await generateComponents(100);
  console.log('Components generated');
})();
