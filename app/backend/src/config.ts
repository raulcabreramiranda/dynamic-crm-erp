export class Config {
  debugLogging = 'debug';

  'server.port' = '8081';
  'jhipster.clientApp.name' = 'generador';
  'jhipster.registry.password' = 'admin';
  'jhipster.security.authentication.jwt.base64-secret' = '';
  'jhipster.security.authentication.jwt.token-validity-in-seconds' = 86400;
  'jhipster.security.authentication.jwt.token-validity-in-seconds-for-remember-me' = 2592000;
  'jhipster.mail.base-url' = 'http://127.0.0.1:${server.port}';
  'jhipster.mail.from' = 'generador@localhost';
  'jhipster.swagger.default-include-pattern' = '/api/.*';
  'jhipster.swagger.title' = 'generador API';
  'jhipster.swagger.description' = 'generador API documentation';
  'jhipster.swagger.version' = '0.0.1';
  'jhipster.swagger.path' = '/api/v2/api-docs';
  'eureka.client.enabled' = true;
  'eureka.client.healthcheck.enabled' = true;
  'eureka.client.fetch-registry' = true;
  'eureka.client.register-with-eureka' = true;
  'eureka.client.instance-info-replication-interval-seconds' = 10;
  'eureka.client.registry-fetch-interval-seconds' = 10;
  'eureka.instance.appname' = 'generador';
  'eureka.instance.instanceId' = 'generador:${random.value}';
  'eureka.instance.lease-renewal-interval-in-seconds' = 5;
  'eureka.instance.lease-expiration-duration-in-seconds' = 10;
  'eureka.instance.status-page-url-path' = '${management.endpoints.web.base-path}/info';
  'eureka.instance.health-check-url-path' = '${management.endpoints.web.base-path}/health';
  'eureka.instance.metadata-map.zone' = 'primary';
  // 'eureka.instance.metadata-map.profile' = '${profiles.active}';
  'eureka.instance.metadata-map.git-version' = '${git.commit.id.describe:}';
  'eureka.instance.metadata-map.git-commit' = '${git.commit.id.abbrev:}';
  'eureka.instance.metadata-map.git-branch' = '${git.branch:}';
  'eureka.instance.prefer-ip-address' = true;
  'eureka.client.service-url.defaultZone' = 'http://admin:${jhipster.registry.password}@localhost:8761/eureka/';
  'cloud.config.uri' = 'http://admin:${jhipster.registry.password}@localhost:8761/config';
  'cloud.config.name' = 'generador';
  'cloud.config.profile' = 'prod';
  'loud.config.label' = 'master';

  constructor(properties) {
    this.addAll(properties);
  }

  public get(key: string): any {
    return this[key];
  }

  public addAll(properties): any {
    properties = objectToArray(properties);
    for (const property in properties) {
      if (properties.hasOwnProperty(property)) {
        this[property] = properties[property];
      }
    }
    this.postProcess();
  }

  public postProcess(): any {
    const variables = { ...this, ...process.env };
    for (const property in this) {
      if (this.hasOwnProperty(property)) {
        const value = this[property];
        const processedValue = this.processTemplate(value, variables);
        this[property] = processedValue;
      }
    }
  }

  private processTemplate(template, variables): any {
    // console.log(template);
    if (typeof template === 'string') {
      return template.replace(new RegExp('\\${[^{]+}', 'g'), (name) => variables[name.substring(2, name.length - 1)]);
    }
    return template;
  }
}

const config = { get: () => '' };

export { config };

function objectToArray(source, currentKey?, target?): any {
  target = target || {};
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const newKey = currentKey ? currentKey + '.' + property : property;
      const newVal = source[property];

      if (typeof newVal === 'object') {
        objectToArray(newVal, newKey, target);
      } else {
        target[newKey] = newVal;
      }
    }
  }
  return target;
}
