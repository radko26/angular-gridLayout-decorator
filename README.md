#Customizable layouts

#ng-sirmaspa
*AngularJS Single Page Application Project kickstarter.*

#### ng-sirmaspa includes:
* **Application**
    * [RequireJS](http://requirejs.org/) - JavaScript file and module loader
    * [ocLazyLoad](https://github.com/ocombe/ocLazyLoad) - Load modules on demand (lazy load) in AngularJS
    * [uiRouter] (https://github.com/angular-ui/ui-router) - The de-facto solution to flexible routing with nested views
    * [Bower](http://bower.io/) - Front-end package manager
    * [Gulp](http://gulpjs.com/) - Streaming build system
* **Testing**
    * [angular-mocks](https://github.com/angular/bower-angular-mocks/) - Mocking for AngularJS
    * [Karma](http://karma-runner.github.io/) - JavaScript unit test runner
    * [Mocha](http://mochajs.org/) - Testing framework
    * [Chai](http://chaijs.com/) - Super-flexible assertion library
    * [Istanbul](http://gotwarlost.github.io/istanbul/) - Yet another code coverage tool for Javascript
* **Quality**
    * [Sonar](https://www.npmjs.com/package/gulp-sonar) - Sonar runner for gulp.
   

#### Instructions:


1. Run bower in the ng-sirmaspa directory to install front-end dependencies: `bower install`.
2. Install other dependencies: `npm install`.
3. Use `gulp start` to launch the app on `http://localhost:8081/public`.
  * Use `gulp -d <path>` to set different build path.
4. Edit sonar task from the `gulpfile.js` and upload your project with `gulp sonar`.
I hope you find this useful!
