import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'



//import html and css files of this component
import mobileTemplate from './mobile.html';

//import './mobile.css';
import './mobile.css';

//import modules
import { name as Manga } from '../manga/manga';
import { name as Mangas } from '../mangas/mangas';
import { name as Scans } from '../scans/scans';


class App {
    constructor($scope, $reactive,$http) {
        'ngInject';
        $reactive(this).attach($scope);
        var vm = this;

        document.addEventListener("backbutton", onBackButtonDown, false);

        $http({
            method: 'POST',
            url: '54.231.41.26'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response)
        }, function errorCallback(response) {
            console.log(response)

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });


        function onBackButtonDown(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        /*
            the logic of the component should be encapsuled here 
         */
    }
}

const name = 'app';
const template = mobileTemplate;
//create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Manga,
    Mangas,
    Scans
]).component(name, {
    template,
    controllerAs: name,
    controller: App
}).config(config); //to set the route config of this Component
function config($locationProvider, $urlRouterProvider, $httpProvider) {
    'ngInject';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/mangas'); //to set a default route in general used in a global context not in a component
}