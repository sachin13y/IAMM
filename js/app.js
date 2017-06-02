(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCRSkmJdWQktL_jqf5_NPhV5Uge34o7R30",
        authDomain: "iamarathimandal-dba8f.firebaseapp.com",
        databaseURL: "https://iamarathimandal-dba8f.firebaseio.com",
        projectId: "iamarathimandal-dba8f",
        storageBucket: "iamarathimandal-dba8f.appspot.com",
        messagingSenderId: "1071888956782"
    };
    firebase.initializeApp(config);
    var db = firebase.database();
    var ref = db.ref('users');
    var refAppComments = db.ref('contact_us');
    ref.on('value', getUsers, errData);

    var lemail = $('#loginEmail');
    var lpass = $('#loginPass');
    var btnLogin = $('#login');
    var btnSignUp = $('#signUp');
    var btnLogout = $('#logoutMenuBtn');
    var btnLogoutConYes = $('#logoutConYes');
    var btnGuest = $('#signInGuest');
    var btnGotoLoginPg = $('#goToSignUp');
    var btnRecoverPass = $('#recoverPass');
    var fgPassEmail = $('#fgPassEmail');
    var contactUsEmail = $('#contactUsEmail');
    var contactUsComments = $('#contactUsComments');
    var contactUsFullName = $('#contactUsFullName');
    var btnSubmitContactUs = $('#submitContactUs');
    var btnGoToLogin = $('#goToLogin');

    //collapse all accordian
    $('#eventHomeBtn, #galleryHomeBtn').on('click', function() {
        $(".ui-collapsible-heading").addClass("ui-collapsible-heading-collapsed");
        $(".ui-collapsible-content").addClass("ui-collapsible-content-collapsed");
        $(".ui-collapsible-heading a").removeClass("ui-icon-minus").addClass("ui-icon-plus");
    });

    //sigin in existing user
    btnLogin.click(function () {
        var email = lemail.val().trim();
        var pass = lpass.val().trim();
        var auth = firebase.auth();

        var validEmail = validateEmail(lemail,email);
        var validPass = validatePassword(pass);

        if(validEmail && validPass){
            var promise = auth.signInWithEmailAndPassword(email,pass);
            promise.catch(function (error) {
                var errCode = error.code;
                var errMessage = error.message;
                console.log('sign in error= '+errMessage);
                if(errMessage.indexOf('There is no user record corresponding to this identifier') !== -1){
                    lpass.parent().after("<div class='validation' style='color:red;margin-bottom: 16px;'>" +
                        "Sorry, we couldn't find an account with that email.</div>");
                }else if (errMessage.indexOf('The password is invalid') !== -1){
                    lpass.parent().after("<div class='validation' style='color:red;margin-bottom: 16px;'>" +
                        "Invalid password. " +
                        "<a href='#fgPasswordPage'>Forgot password?</a></div>");
                }
            })
        }
    });

    //login email validation
    function validateEmail(emailField, emailVal) {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{3}$/i;
        emailField.parent().next(".validation").remove();

        if(!emailVal){
            emailField.parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>" +
                "Please enter email address</div>");
            return false;
        }else if(emailVal && !testEmail.test(emailVal)){
            emailField.parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>" +
                "Invalid email address</div>");
            return false;
        }else {
            return true;
        }
    }

    //login password validation
    function validatePassword(pass) {
        lpass.parent().next(".validation").remove();

        if(!pass){
            lpass.parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>" +
                "Please enter password</div>");
            return false;
        }else if(pass && pass.length < 6){
            lpass.parent().after("<div class='validation' style='color:red;margin-bottom: 20px;'>" +
                "Password must be at least 6 characters long</div>");
            return false;
        }else {
            return true;
        }
    }

    //alphanumeric field validation
    function isAlphaNumericField(field, fieldVal, fieldName){
        var testField = /^[A-Za-z0-9_?.!'"@ ]+$/;
        field.parent().next(".contactUsValidation").remove();
        field.next(".contactUsValidation").remove();
        if(!fieldVal){
            if(field[0].id === 'contactUsComments'){
                field.after("<div class='contactUsValidation' style='color:red;margin-bottom: 20px;'>" +
                    "Please enter "+fieldName+ ".</div>");
            }else {
                field.parent().after("<div class='contactUsValidation' style='color:red;margin-bottom: 20px;'>" +
                    "Please enter "+fieldName+ ".</div>");
            }
            return false;
        }else if(fieldVal && !testField.test(fieldVal)){
            if(field[0].id === 'contactUsComments'){
                field.after("<div class='contactUsValidation' style='color:red;margin-bottom: 20px;'>" +
                    "Only letters & numbers are valid input</div>");
            }else  {
                field.parent().after("<div class='contactUsValidation' style='color:red;margin-bottom: 20px;'>" +
                    "Only letters & numbers are valid input</div>");
            }
            return false;
        }else{
            return true;
        }
    }

    //clear error messages
    function clearErrorMsg() {
        lemail.parent().next(".validation").remove();
        lpass.parent().next(".validation").remove();
        $('.contactUsValidation').remove();
        $('.validation').remove();
    }

    //guest user settings
    function enableGuestUserMode() {
        clearErrorMsg();
        $('#eventMenuBtn').addClass('ui-disabled');
        $('#galleryMenuBtn').addClass('ui-disabled');
        $('#bmmMenuBtn').addClass('ui-disabled');
        $('#aboutNextBtn').addClass('ui-disabled');
        $('#aboutFooter').addClass('ui-disabled');
        $('#contactFooter').addClass('ui-disabled');
        $('#logoutMenuBtn').addClass('ui-disabled');
        btnGotoLoginPg.show();
    }

    //remove guest user settings
    function disableGuestUserMode() {
        $('#eventMenuBtn').removeClass('ui-disabled');
        $('#galleryMenuBtn').removeClass('ui-disabled');
        $('#bmmMenuBtn').removeClass('ui-disabled');
        $('#aboutNextBtn').removeClass('ui-disabled');
        $('#aboutFooter').removeClass('ui-disabled');
        $('#contactFooter').removeClass('ui-disabled');
        $('#logoutMenuBtn').removeClass('ui-disabled');
        btnGotoLoginPg.hide();
    }

    //contact us submit
    btnSubmitContactUs.click(function (){
        var contactEmailVal = contactUsEmail.val().trim();
        var contactCommentsVal = contactUsComments.val().trim();
        var contactFullNameVal = contactUsFullName.val().trim();
        var validName = isAlphaNumericField(contactUsFullName,contactFullNameVal, 'Full Name');
        var validEmail = validateEmail(contactUsEmail,contactEmailVal, 'Email');
        var validComments = isAlphaNumericField(contactUsComments,contactCommentsVal, 'Comments/Questions');
        if(validName && validEmail && validComments){
            refAppComments.push({
                name: contactFullNameVal,
                email: contactEmailVal,
                comment: contactCommentsVal
            });
            $.mobile.changePage("#contactSubmit",{
                transition: "pop",
                role: 'dialog'
            });
            $('#contactUsComments, #contactUsEmail, #contactUsFullName').val('');
        }
    });

    //register new user
    btnSignUp.click(function () {
        var email = lemail.val().trim();
        var pass = lpass.val().trim();
        var auth = firebase.auth();

        var validEmail = validateEmail(lemail,email);
        var validPass = validatePassword(pass);

        if(validEmail && validPass){
            var promise = auth.createUserWithEmailAndPassword(email,pass);
            promise.catch(function (error) {
                var errCode = error.code;
                var errMessage = error.message;
                console.log('sign in error= '+errMessage);
                if(errMessage.indexOf('The email address is already in use by another account') !== -1){
                    lpass.parent().after("<div class='validation' style='color:red;margin-bottom: 16px;'>" +
                        "Email is already registered. Want to try login or " +
                        "<a href='#fgPasswordPage'>recover your password?</a></div>");
                }
            })
        }
    });

    //guest user
    btnGuest.click(function () {
        enableGuestUserMode();
        window.location.href = '#home';
    });

    //forgot password
    btnRecoverPass.click(function () {
        var email = fgPassEmail.val().trim();
        var auth = firebase.auth();

        var validEmail = validateEmail(fgPassEmail,email);

        if(validEmail){
            auth.sendPasswordResetEmail(email).then(function() {
                alert("Successful! Please check your email.");
                // Email sent.
                $.mobile.changePage("#loginPage",{
                    transition: "slide"
                });
            }, function(error) {
                // An error happened.
            });
        }
    });

    //go to login page (from fg pass)
    btnGoToLogin.click(function () {
        clearErrorMsg();
        $.mobile.changePage("#loginPage",{
            transition: "slide"
        });
    });

    //logout confirmation
    btnLogout.click(function () {
        $.mobile.changePage("#confirmLogout",{
            transition: "pop",
            role: 'dialog'
        });
    });

    //logout
    btnLogoutConYes.click(function () {
        lpass.val('');
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            window.location.href = '#loginPage';
        }).catch(function(error) {
            // An error happened.
            console.log('sign out error= '+errMessage);
        });
    });

    //auth listener
    firebase.auth().onAuthStateChanged(function(user) {
        clearErrorMsg();
        if (user) {
            // User is signed in
            disableGuestUserMode();
            window.location.href = '#home';
        } else {
            // User is signed out.
        }
    });

}());