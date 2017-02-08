import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'

//in order to use any schema u should import its js file 
//import { databaseExemple } from '../../database/template';

import { name as Scan } from '../scan/scan';


//import html and css files of this component
import mobileTemplate from './mobile.html';

import './mobile.css';

//import narutoTitles from '/home/oussama/Desktop/wikia/public/data/naruto/titles.json'


class Mangas {
    constructor($scope, $reactive, $http) {
        'ngInject';
        $reactive(this).attach($scope);
        var vm = this;
        vm.list = [];
        vm.loadingData = true;
        $http.get("data/mangas.json")
            .then(function (response) {
                vm.loadingData = false;
                vm.list = response.data;
            });


        vm.moreContainer = {
            _show: false,
            toggle: function () {
                this._show = !this._show;
            }
        }

        vm.moreButton = {
            click: function ($event) {
                vm.moreContainer.toggle();
                $event.stopPropagation();
            }
        }

        $('body').bind('click', () => {
            $scope.$apply(() => {
                vm.moreContainer._show = false;
            })
        })

        /*
            the logic of the component should be encapsuled here 
         */

    }
}

const name = 'mangas';
const template = mobileTemplate;
//create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Scan
]).component(name, {
    template,
    controllerAs: name,
    controller: Mangas
}).config(config); //to set the route config of this Component
function config($locationProvider, $stateProvider, $urlRouterProvider) {
    'ngInject';
    //$locationProvider.html5Mode(true);
    //$urlRouterProvider.otherwise('/'); //to set a default route in general used in a global context not in a component
    $stateProvider
        .state('mangas', {
            url: '/mangas',
            template: '<mangas></mangas>',
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