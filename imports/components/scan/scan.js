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


class Scan {
    constructor($scope, $reactive, $stateParams, $interval, $http) {
        'ngInject';
        $reactive(this).attach($scope);
        var vm = this;

        if (Meteor.isCordova) {
            if (Math.floor(Math.random() * 100) % 10 == 0) {
                AdMob.prepareInterstitial({
                    adId: admobid.interstitial,
                    autoShow: true
                });
            }
        }

        vm.chapterNbr = chapterNbr;
        vm.manga = $stateParams.manga;
        vm.index = $stateParams.scan;
        vm.scan = {};
        $http.get("data/" + vm.manga + "/chapter" + vm.index + ".json")
            .then(function (response) {
                vm.scan = response.data;
            });
        vm.page = $stateParams.page;
        vm.imgLoaded = false;

        vm.next = function () {
            if (Meteor.isCordova) {
                if (Math.floor(Math.random() * 100) % 10 == 0) {
                    AdMob.prepareInterstitial({
                        adId: admobid.interstitial,
                        autoShow: true
                    });
                }
            }

            vm.imgLoaded = false;
            vm.page++;
            $('#scanImage').panzoom("reset");
        }
        vm.previous = function () {
            if (Meteor.isCordova) {
                if (Math.floor(Math.random() * 100) % 10 == 0) {
                    AdMob.prepareInterstitial({
                        adId: admobid.interstitial,
                        autoShow: true
                    });
                }
            }

            vm.imgLoaded = false;
            vm.page--;
            $('#scanImage').panzoom("reset");
        }


        var touchtime = 0;
        $('#scanImage').on('touchend', function () {
            if (touchtime == 0) {
                touchtime = new Date().getTime();
            } else {
                if (((new Date().getTime()) - touchtime) < 800) {
                    //double click occurred
                    // $('#scanImage').panzoom("zoom", 1);
                    if ($('#scanImage').panzoom("isPanning"))
                        $('#scanImage').panzoom("reset");

                    touchtime = 0;
                } else {
                    touchtime = new Date().getTime();
                }
            }

        })

        $('#scanImage').panzoom({
            minScale: 1,
            increment: 1,
            duration: 50
        })


        $('#scanImage').on('load', function () {
            $scope.$apply(() => {
                vm.imgLoaded = true;
            })
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

const name = 'scan';
const template = mobileTemplate;
//create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
]).component(name, {
    template,
    controllerAs: name,
    controller: Scan
}).config(config); //to set the route config of this Component
function config($locationProvider, $stateProvider, $urlRouterProvider) {
    'ngInject';
    //$locationProvider.html5Mode(true);
    //$urlRouterProvider.otherwise('/'); //to set a default route in general used in a global context not in a component
    $stateProvider
        .state('scan', {
            url: '/manga/:manga/scans/:scan/:page',//'/scans/scan/:id/:page',
            template: '<scan></scan>',
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