Package.describe({
  name: 'todda00:friendly-slugs',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/todda00/meteor-friendly-slugs.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use(['coffeescript','matb33:collection-hooks']);
  api.versionsFrom('1.0');
  api.addFiles('slugs.coffee');
});