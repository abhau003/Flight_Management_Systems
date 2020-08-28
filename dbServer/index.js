let express = require('express');
let jwt = require('jsonwebtoken')
let bp = require('body-parser');
let cors = require('cors');
let fs = require('fs');
const contactDataFile = "contact.json";
const loginDataFile = "login.json";
const FlightDataFile = "flight.json";
const port = 5454;
let usernamtest = '';
let search;
const BookDataFile = "bookingdetails.json";
let glblusername;
let pnr;

fs.readFile(contactDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        libConactData = JSON.parse(data);
    }
});

fs.readFile(loginDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        loginData = JSON.parse(data);
    }
});

fs.readFile(FlightDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        flightData = JSON.parse(data);
    }
});

fs.readFile(BookDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        BookData = JSON.parse(data);
    }
});

const saveContactDataAndRespond = (resp) => {
    fs.writeFile(contactDataFile, JSON.stringify(libConactData), (err) => {
        if (err) {
            console.log(err);
            resp.status(500);
            resp.end();

        } else {
            resp.status(200);
            resp.end();

        }
    })
}

const saveBookDataAndRespond = (resp) => {
    fs.writeFile(BookDataFile, JSON.stringify(BookData), (err) => {
        if (err) {
            console.log(err);
            resp.status(500);
            resp.end();

        } else {
            console.log("PNR inside->" +pnr)
            resp.send({pnr});
            resp.status(200);
            resp.end();

        }
    })
}


const parseReqToContact = (req) => (
    {
        cid: req.body.cid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        mail: req.body.mail,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        group: req.body.group
    }    
);

const parseReqToLogin = (req) => (

    {
        usernamtest: req.body.username,
        passwordtest: req.body.password
    }    
);

const parseReqToFlightSearch = (req) => (

    {
        departuredate: req.body.departuredate,
        departurecity: req.body.departurecity,
        arrivalcity: req.body.arrivalcity,
        noofPassengers: req.body.noofPassengers,
        flightid: req.body.flightid
    }    
);

const parseReqToBook = (req) => (

    {
        passengerusername:glblusername,
        passengerpnr:pnr,
        passengerflightnumber:req.body.flightnumber,
        passengername: req.body.fullname,
        passengeremail: req.body.emailid,
        passengercity: req.body.phonenumber,
        passengerstate: req.body.city,
        passengercountry: req.body.state,
        passengernoofPassengers: req.body.noofPassengers,
        passengerdeparturecity: req.body.departurecity,
        passengerarrivalcity: req.body.arrivalcity,
        passengeramount: req.body.amount*req.body.noofPassengers,
        passengerdeparturedate: req.body.departuredate,
        passengerbaseamount: req.body.baseamount,
        passengertaxes: req.body.taxes,
        passengercardnumber: req.body.cardnumber,
        passengercardexpirydate: req.body.cardexpirydate,
        passengercardcvv: req.body.cardcvv
    }    
);

let libServer = express();

libServer.use(bp.json());
libServer.use(bp.urlencoded({ extended: true }));
libServer.use(cors());

//default request
libServer.get('/', (req, resp) => {
    resp.send("Welcome to Lib Server");
});

libServer.get('/contacts', (req, resp) => {
    resp.send(libConactData.contacts);
});

libServer.get('/login', (req, resp) => {
    resp.send(loginData);
});

libServer.get('/dashboard-page', (req, resp) => {
    resp.send(flightData);
});

libServer.get('/mybookings', (req, resp) => {
    const bookingresults = BookData.filter(x=>x.passengerusername == glblusername);
    console.log("Booking Data->" +bookingresults);
    resp.send(bookingresults);
});

// libServer.get('/contacts/:id', (req, resp) => {
//     let contact = libConactData.contacts.find(b => b.cid == req.params.id);
//     if (contact) {
//         resp.send(contact);
//     } else {
//         resp.status(404);
//         resp.end();
//     }

// });

libServer.get('/dashboard-page/:id', (req, resp) => {
    console.log(req.params.id)
    let flightdetails = flightData.filter(b => b.flightid == req.params.id);
     console.log(search)
    if (flightdetails) {
        console.log(flightdetails)
        resp.send(flightdetails);
    } else {
        resp.status(404);
        resp.end();
    }
});



libServer.post('/contacts', (req, resp) => {

    let contact = parseReqToContact(req);
    libConactData.contacts.push(contact);
    saveContactDataAndRespond(resp);

});

libServer.post('/bookconfirm', (req, resp) => {

    console.log("Gobal->" +glblusername)
    pnr="PNR"+Math.floor((Math.random() * 10000000000) + 1);
    let book = parseReqToBook(req);
    BookData.push(book);
    saveBookDataAndRespond(resp);
    console.log(pnr);
    //resp.send(pnr);
    //resp.end();

});

libServer.post('/login', (req, resp) => {

    let login = parseReqToLogin(req);
    /*login.username = 'abhau003'
    login.password = 'arun123'*/
   // saveContactDataAndRespond(resp);
    glblusername = login.usernamtest
    console.log("Hi"+login.usernamtest)
    //console.log(req.body.username)
    console.log(login.passwordtest)
    //console.log('Arindam'+JSON.stringify(loginData));

//    loginData.forEach(element => {
//     //    console.log("AAAA" +element.username)
//     //    console.log("BBBB" +login.usernamtest)
//     //    console.log(typeof element.username)
//     //    console.log(typeof login.usernamtest)
//       if(element.username==login.usernamtest && element.pass == login.passwordtest)
//        {
//           console.log("Good")
//           console.log("User is Valid!!!");
//           resp.send({"isValid":"True"});
//           resp.status(200);
//       }
//       else{
//           console.log("User is not Valid!!!");
//           resp.send({"isValid":"False"});
//           resp.status(500);
          
//       }
//       resp.end();
//     })
//   });

    
   if(loginData.filter(x=>x.username == login.usernamtest && x.pass == login.passwordtest).length>0)
   {

       console.log("User is Valid!!!");
       //resp.send({"isValid":"True"});
       let payload = { subject: resp.id}
       console.log("Payload" +payload)
       let token = jwt.sign(payload,'secretKey')
       resp.send({token});
       resp.status(200);
       resp.end();
   }
   else{
       console.log("User is not Valid!!!");
       resp.send({"isValid":"False"});
       resp.status(500);
       resp.end();
   }

});

/**********************Flight Search *********************************** */
libServer.post('/dashboard-page', (req, resp) => {

    search = parseReqToFlightSearch(req);
    console.log(search.departurecity)
    console.log(search.departuredate)
    console.log(search.arrivalcity)
    console.log("Search" +search.noofPassengers)
    /*login.username = 'abhau003'
    login.password = 'arun123'*/
   // saveContactDataAndRespond(resp);
    //console.log("Hi"+se.usernamtest)
    //console.log(req.body.username)
    //console.log(login.passwordtest)
    //console.log('Arindam'+JSON.stringify(loginData));

    // flightData.forEach(element=> {
    //     console.log("Element-Departure City->" +element.departurecity)
    //     console.log("Flight Data-Departure City->" +search.departurecity)
    //     if (element.departurecity == search.departurecity)
    //     console.log("Departure City Matched")
    //     else
    //     console.log("Departure City Not matched")

    //     console.log("Element-Departure Date->" +element.departuredate)
    //     console.log("Flight Data-Departure Date->" +search.departuredate)
    //     if (element.departuredate == search.departuredate)
    //     console.log("Departure Date Matched")
    //     else
    //     console.log("Departure Date Not matched")

    //     if (element.arrivalcity == search.arrivalcity)
    //     console.log("Arrival City Matched")
    //     else
    //     console.log("Arrival City Not matched")

    //     console.log("DB Passengers ->" +element.noofPassengers)
    //     console.log("Input Passengers ->" +search.noofPassengers)
    //     if (element.noofPassengers > search.noofPassengers)
    //     console.log("No. of Passengers Satisfied")
    //     else
    //     console.log("Passenger Criteria not satisfied")

    //     console.log("Element-Departure Date->" +element.departuredate)
    //     console.log("Flight Data-Departure Date->" +search.departuredate)
    //     if (element.departuredate == search.departuredate)
    //     console.log("Departure Date Matched")
    //     else
    //     console.log("Departure Date Not matched")
    //     console.log("Element-Departure Date City->" +element.departuredate)
    //     console.log("Element-Arrival City->" +element.arrivalcity)
    //     console.log("Element-No. of Passengers->" +element.noofPassengers)
    // })
    
    console.log(search.noofPassengers)
    console.log(typeof search.noofPassengers)
    const result = flightData.filter(x=>
        x.departurecity == search.departurecity && 
        x.departuredate == search.departuredate && x.arrivalcity == search.arrivalcity &&
        x.noofPassengers >= search.noofPassengers);
        console.log("Response")
        console.log(result)
    resp.send(result);
    if(flightData.filter(x=>x.departurecity == search.departurecity && 
    x.departuredate == search.departuredate && x.arrivalcity == search.arrivalcity/*&&
    x.noofPassengers >= search.noofPassengers*/).length>0)
   {

       console.log("Flight Data Returning!!!");
       //resp.send({"isValid":"True"});
       //resp.send(flightData);
      // resp.status(200);
      // resp.end();
   }
   else{
       console.log("User is not Valid!!!");
       //resp.send({"isValid":"False"});
       //resp.status(500);
       //resp.end();
   }

 });
/********************************************************* */

libServer.put('/contacts', (req, resp) => {
    let contact = parseReqToContact(req);
    let index = libConactData.contacts.findIndex(b => b.cid == contact.cid);
    libConactData.contacts[index] = contact;
    saveContactDataAndRespond(resp);

});

libServer.delete('/contacts/:id', (req, resp) => {
    let index = libConactData.contacts.findIndex(b => b.cid == req.params.id);
    libConactData.contacts.splice(index, 1);
    saveContactDataAndRespond(resp);

});

libServer.listen(port, () => {
    console.log(`Server is ready at ${port}`)
});

