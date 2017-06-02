//device event listener
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log("Sachin's Device is ready!!");
    var photos = "https://api.flickr.com/services/feeds/photos_public.gne?id=149522442@N02&format=json";
    $.ajax({
        data:{format: "json"},
        dataType: "jsonp",
        url: photos
    });
    window.plugins.PushbotsPlugin.initialize("5926b4d04a9efaa7d88b4567", {"android":{"sender_id":"549109051629"}});
}

function getUsers(data) {
    console.log(data.val());
}

function errData(err) {
    console.log("Error");
    console.log(err);
}

function submitToDB() {
    var db = firebase.database();
    var ref = db.ref('users');
    ref.push({
        first_name: $("#fname").val().trim(),
        last_name: $("#lname").val().trim(),
        email: $("#emailOrUname").val().trim(),
        password: $("#pass").val().trim()
    });
}

function jsonFlickrFeed (data) {
    var diwali2016 = [];
    var apj_practice = [];
    for (var i=0;i< data.items.length;i++) {
        var tag = data.items[i].tags;
        if (tag === 'diwali2016') {
            diwali2016.push(data.items[i]);
        } else {
            apj_practice.push(data.items[i]);
        }
    }
    makeDiwaliAlbum(diwali2016);
    makeAPJPracticeAlbum(apj_practice);
}

function makeDiwaliAlbum (data) {
    var output = '';
    for (var i=0;i< data.length;i++){
        var title = data[i].title;
        var link = data[i].media.m.substring(0,58);
        var blocktype = ((i%3) === 2) ? 'c': ((i%3) === 1) ? 'b': 'a';
        output += '<div class="ui-block-'+blocktype+'">';
        output += '<a href="#show_photo" data-transition="fade" onclick="showPhoto(\''+ link + '\', \'' + title + '\')">';
        output += '<img src="' +link+ '_s.jpg" alt="'+title+'"/>';
        output += '</a>';
        output += '</div>';
    }
    //alert("inside makeDiwaliAlbum");
    $('#diwali_2016').html(output);
}

function makeAPJPracticeAlbum (data) {
    var output = '';
    for (var i=0;i< data.length;i++){
        var title = data[i].title;
        var link = data[i].media.m.substring(0,58);
        var blocktype = ((i%3) === 2) ? 'c': ((i%3) === 1) ? 'b': 'a';
        output += '<div class="ui-block-'+blocktype+'">';
        output += '<a href="#show_photo" data-transition="fade" onclick="showPhoto(\''+ link + '\', \'' + title + '\')">';
        output += '<img src="' +link+ '_s.jpg" alt="'+title+'"/>';
        output += '</a>';
        output += '</div>';
    }
    $('#bmm_practice').html(output);
}


showPhoto = function(link , title){
    var output = '<a href="#gallery" data-transition="fade">';
    output += '<img src="' +link+ '_b.jpg" alt="'+title+'"/>';
    output += '</a>';
    $('#my_photo').html(output);
};

showFullPhoto = function(path , title, pageID){
    var output = '<a href="#'+pageID+'" data-transition="fade">';
    output += '<img src="'+path+'.jpg" alt="'+title+'"/>';
    output += '</a>';
    $('#full_photo').html(output);
};



// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');
//
//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');
//
//         console.log('Received Event: ' + id);
//     }
// };
