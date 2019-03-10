const Ajv = require('ajv');

const defaultOpts = {
  validate: true,
  fake: true
};

module.exports = function(opts = {}) {
  opts = { ...defaultOpts, ...opts };

  return function jsonSchemaPlugin(app, compiler) {
    if (opts.validate) {
      let ajvOpts = opts.validate === true ? {} : opts.validate;

      compiler.use((components, next, ctx) => {
        components.forEach(component => {
          if (component.config.schema) {
            const ajv = new Ajv({
              allErrors: true,
              ...ajvOpts
            });
            const schema = {
              $schema: 'http://json-schema.org/draft-07/schema#',
              $id: component.name,
              title: component.label,
              type: 'object',
              ...component.config.schema
            };

            component.scenarios.forEach(scenario => {
              const valid = ajv.validate(schema, scenario.props);
              if (!valid) {
                const { errors } = ajv;
                for (const error of errors) {
                  const message = error.dataPath ? `${error.dataPath} ${error.message}` : error.message;
                  ctx.log(`${component.name}/${scenario.name} ${message}`, 'warn');
                }
              }
            });
          }
        });
      });
    }
  };
};
