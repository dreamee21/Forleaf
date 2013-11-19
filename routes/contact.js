var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "krislabs21@gmail.com",
        pass: "zmfltmfoqtm"
    }
});

exports.send_mail = function(req, res) {
	var email = req.body.contact_email;
	var content = req.body.contact_content;

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    to: "earth@aurumplanet.com", // list of receivers
	    subject: "Contact from Forleaf", // Subject line "Hello"
		html: "<b>From: "+email+"</b><br /><br />"+"<p>"+content+"</p>"	    
	}

	// send mail with defined transport object
	smtpTransport.sendMail(mailOptions, function(error, response){
	    if(error){
	        console.log(error);
	    }else{
	        console.log("Message sent: " + response.message);
	        var result = {result: "success"};
	        res.send(result);
	    }

	    // if you don't want to use this transport object anymore, uncomment following line
	    //smtpTransport.close(); // shut down the connection pool, no more messages
	});
}