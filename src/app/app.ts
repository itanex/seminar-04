import angular from 'angular';
import { ApplicationController } from './app.controller';

// Create the App Module
const APP: ng.IModule = angular.module('app', []);

// Add the Application Controller to the App Module
APP.controller('ApplicationController', ApplicationController);
