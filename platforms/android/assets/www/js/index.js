/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var population = 0;
var malePop = 0;
var femalePop = 0;
var malePercent = 0;
var femalePercent = 0;
var avgAge = 0;


function barcodescanner() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          
          
          // Current Date
          var currentDate = new Date();
          var today = currentDate.toLocaleDateString();
          
          // Result String
          var scan = result.text;
          
          // Checks DL Exp Date
          var dlExpStart = scan.search("DBA") + 3;
          var dlExpEnd = dlExpStart + 8;
          var dlExp = scan.slice(dlExpStart, dlExpEnd);
          
          var dlExpYr = dlExp.slice(0,4);
          console.log(dlExpYr);
          var dlExpMn = dlExp.slice(3,5);
          console.log(dlExpMn);
          var dlExpDay = dlExp.slice(5,7);
         
          // Checks Age
          var ddbStart = scan.search("DBB") + 3;
          var ddbEnd = ddbStart + 8;
          var ddb = scan.slice(ddbStart, ddbEnd);
          
          
          // Checks Gender
          var genStart = scan.search("DBC") + 3;
          var genEnd = genStart + 1;
          var genNum = scan.slice(genStart, genEnd);
          
              if (genNum == 1) {
                  malePop += 1;
                  population += 1;
                  malePercent = (~~((malePop / population) * 100));
              } else {
                  femalePop += 1;
                  population += 1;
                  femalePercent = (~~((femalePop / population)) * 100);
              }
          
          malePop;
          malePercent;
          
          femalePop;
          femalePercent;
          
          population;
          
          alert("DOB: " + ddb + "\n" + 
               "EXP: " + dlExp + "\n" +
               "Today: " + today + "\n" +
               "Population: " + population + "\n" +
               "Male #: " + malePop + "\n" +
               "Male %: " + malePop + "% \n" +
               "Female #: " + femalePop + "\n" +
               "Female %: " + femalePercent + "%");
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS
      }
   );
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
