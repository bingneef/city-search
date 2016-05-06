module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-npm')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      repositoryUrl: 'git@github.com:bingneef/city-search.git',
      dirToCopy: '',
      ignores: ['.git', 'node_modules'],
      keepReleases: 10,
      deleteOnRollback: false,
      shallowClone: false,
      npm: {
        remote: false
      },
      bower: {
        remote: false
      }
    },
    production: {
      servers: 'bing@5.157.85.46',
      branch: 'master',
      deployTo: '/var/www/city-search/'
    },
    staging: {
      servers: 'bing@5.157.85.46',
      branch: 'develop',
      deployTo: '/var/www/city-search/'
    }
  });
};
