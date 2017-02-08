import angular from 'angular';
import { Meteor } from 'meteor/meteor';



import '/public/CDN/jquery/jquery-3.1.1.min.js'
import '/public/CDN/bootstrap/css/bootstrap.min.css'
import '/public/CDN/bootstrap/js/bootstrap.min.js'
import '/public/CDN/pan-zoom/panzoom.min.js'
import '/public/CDN/hammer/hammer.min.js'


import './index.css';

import { name as App } from '../imports/components/app/app';


admobid = {
    benner: 'ca-app-pub-8179176285601937/9838095602',
    interstitial: 'ca-app-pub-8179176285601937/3791562005'
}
Meteor.startup(function () {
    if (Meteor.isCordova)
        AdMob.createBanner({
            adId: admobid.benner,
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow: true,
            success: function () {
            },
            error: function () {
            }
        });

    /*
        window.plugins.AdMob.setOptions({
            publisherId: 'ca-app-pub-8179176285601937/9838095602',
            interstitialAdId: 'ca-app-pub-8179176285601937/3791562005',
            bannerAtTop: false, // set o true, to put banner at top
            overlap: false, // set to true, to allow banner overlap webview
            offsetTopBar: false, // set to true to avoid ios7 status bar overlap
            isTesting: false, // receiving test ad
            autoShow: true // auto show interstitial ad when loaded
        });
    
        window.plugins.AdMob.createBannerView();
        */
});


function onReady() {
    angular.bootstrap(document, [
        App
    ], {
            strictDi: true
        });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}