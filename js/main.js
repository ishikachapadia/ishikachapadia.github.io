/*
    Banner ID -- 100123456
    Author Name -- Your Name
    Description -- 

*/

// MY FUNCTIONS

function getHTML (file, target) {
    let getProjectOne = $.ajax({ 
        url: `./html/${file}`,
        type: "POST",
        dataType: "text",
    });

    getProjectOne.fail(function (jqXHR, textStatus) {
        alert(`Something went Wrong! (${file})` + textStatus);
    });

    getProjectOne.done(function (data) {
        $(target).html(data);
        $(".show-project-1").fadeIn();
    });
}


function getHome (anchor) {
    // hide all/
    $(".hideAll").hide();

    const element = document.getElementById(anchor);

    // get html insert
    // display project
    $(".show-home").fadeIn();
    if (element) {
		element.scrollIntoView({
		    behavior: "smooth", // Enables smooth animation
		    block: "start"      // Aligns the top of the element with the top of the viewport
	    }
        );
    }
}

function getMadMovies () {
    // hide all/
    $(".hideAll").hide();

    // get html insert
    getHTML("project_one.html",".show-project-1");

}

function getEasyGroceries () {
    // hide all/
    $(".hideAll").hide();

    // get html insert
    getHTML("project_two.html",".show-project-1");
}

function getProject3 () {
    // hide all/
    $(".hideAll").hide();

    // get html insert
    getHTML("project_three.html",".show-project-3");

    // display project
    $(".show-project-3").fadeIn();
}

function sendForm () {
    let name = $("#name").val();
    let email = $("#email").val();
    let subject = $("#subject").val();
    let message = $("#message").val();
   
    let sendEmail = $.ajax({ 
        url: `./services/send_email.php`,
        type: "POST",
        data: {
            name: name,
            email: email,
            subject: subject,
            message: message,
        },
        dataType: "json",
    });

    sendEmail.fail(function (jqXHR, textStatus) {
        alert(`Something went Wrong! (sendEmail)` + textStatus);
    });

    sendEmail.done(function (data) {
        if (data.error.id == '0') {
            // all good

            // clear form elements
            $("#name").val("");
            $("#email").val("");
            $("#subject").val("");
            $("#message").val("");

            // hide form
            $(".form-container").hide();
            $(".response-container").slideDown(1000);
            // show response
        } else {
            alert(`Contact form error: ${data.error.message}`);
        }
    });

}

$(window).on("load", function () {
    
    // Bind to HTML

    $("#send-form").click(
        function () {
            sendForm();
        }
    );

    $(".click-portfolio").click(
        function () {
            location.href = `#/home/portfolio`;
        }
    );
    $(".click-contact-me").click(
        function () {
            location.href = `#/home/contact-me`;
        }
    );
    $(".click-skills").click(
        function () {
            location.href = `#/home/skills`;
        }
    );
    $(".click-about-me").click(
        function () {
            location.href = `#/home/about-me`;
        }
    );




    $(".click-home").click(
        function () {
            location.href = `#/home/`;
        }
    );

    $(".click-mad-movies").click(
        function () {
            location.href = `#/madmovies/`;
        }
    );


    $(".click-easy-groceries").click(
        function () {
            location.href = `#/easygroceries/`;
        }
    );


    $(".click-project-3").click(
        function () {
            location.href = `#/project3/`;
        }
    );



    // SAMMY ROUTING
    // Controller in MVC
    
    var app = $.sammy(function () {

        this.get('#/home/', function () {
            getHome();
        });

        this.get('#/home/portfolio', function () {
            getHome('portfolio');
        });
        this.get('#/home/contact-me', function () {
            getHome('contactMe');
        });
        this.get('#/home/skills', function () {
            getHome('skills');
        });
        this.get('#/home/about-me', function () {
            getHome('aboutMe');
        });

        this.get('#/madmovies/', function () {
            getMadMovies();
        });

        this.get('#/easygroceries/', function () {
            getEasyGroceries();
        });

        this.get('#/project3/', function () {
            getProject3();
        });

        this.get('#/movie/', function () {
            getMovie();
        });

        this.get('#/people/', function () {
            getPerson();
        });

    });

	// default when page first loads
    $(function () {
        app.run('#/home/');
    });
});


// window.onload = function(){
    
// }