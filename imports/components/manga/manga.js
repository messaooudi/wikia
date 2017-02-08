import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'


//in order to use any schema u should import its js file 
//import { databaseExemple } from '../../database/template';


//import html and css files of this component
import mobileTemplate from './mobile.html';

import './mobile.css';

class Manga {
    constructor($scope,$reactive,$stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        var vm = this;
        vm.manga = $stateParams.manga;
        /*
            the logic of the component should be encapsuled here 
         */

    }
}

const name = 'manga';
const template = mobileTemplate;
//create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
]).component(name, {
    template,
    controllerAs: name,
    controller: Manga
}).config(config); //to set the route config of this Component
function config($locationProvider, $stateProvider, $urlRouterProvider) {
    'ngInject';
    //$locationProvider.html5Mode(true);
    //$urlRouterProvider.otherwise('/'); //to set a default route in general used in a global context not in a component
    $stateProvider
        .state('manga', {
            url: '/manga/:manga',
            template: '<manga></manga>',
            //to determine whene this component should be routed 
            /*resolve: {
                currentUser($q) {
                    if (condition) {
                        return $q.reject();
                    } else {
                        return $q.resolve();
                    }
                }
            }*/
        })
}