const Ajv = require('ajv');

const defaultOpts = {
  validate: true,
  fake: true
};

module.exports = function(opts = {}) {
  opts = { ...defaultOpts, ...opts };

  return function jsonSchemaPlugin(app, compiler) {
    if (opts.validate) {
      let validationErrors = [];

      compiler.use(components => {
        validationErrors = [];
        components.forEach(component => {
          if (component.config.schema) {
            const ajv = new Ajv(opts.validate === true ? {} : opts.validate);
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
                validationErrors.push({ component, scenario, errors });
              }
            });
          }
        });
      });

      compiler.on('finish', () => {
        for (const { component, scenario, errors } of validationErrors) {
          console.log(`${component.name}/${scenario.name}`);
          for (const error of errors) {
            console.log(`-- ${error.message}`);
          }
        }
      });
    }
  };
};
