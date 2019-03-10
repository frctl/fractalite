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
        // build a set of definitions comprising of all component schemas
        const definitions = { $id: 'components' };
        components.forEach(component => {
          definitions[component.name] = {
            type: 'object',
            ...component.config.schema
          };
        });

        components.forEach(component => {
          if (component.config.schema) {
            try {
              const ajv = new Ajv({
                allErrors: true,
                ...ajvOpts
              });
              ajv.addSchema(definitions);

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
            } catch (err) {
              ctx.log(err);
            }
          }
        });
      });
    }
  };
};
