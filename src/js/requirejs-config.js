var requirejsConfig = { 
  baseUrl: '',
  paths: {
    'angular': [
      'lib/angular/angular'
    ],
    'angular-ui-router': [
      'lib/angular-ui-router/release/angular-ui-router'
    ],
    'ocLazyLoad':[
      'lib/oclazyload/dist/ocLazyLoad'
    ]
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router' : {
      deps: ['angular']
    },
    'ocLazyLoad' : {
      deps: ['angular']
    }
  }
};