// AWS.config.update({
//   region: "us-east-1",
//   accessKeyId: "AKIAWHNPJTYWOWANCD6V",
//   secretAccessKey: "*"
// });
AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:687b1ef2-20a7-4a7b-908a-e23815ac0c87'
})
const lambda = new AWS.Lambda({apiVersion: '2015-03-31'});

$(() => {
    hideErrors();
    let hasFinalSolved = false;

    $('#tester').click(e => {
    //   var params = {
    //     TableName :"locked-in-session",
    //     Item:{
    //         "email": "p@a.com",
    //         "message": "Your face"
    //     }
    // };
    //   docClient.put(params, function(err, data) {
    //     if (err) {
    //         console.error(JSON.stringify(err))
    //     } else {
    //       console.log(JSON.stringify(data))

    //     }
    // });
    var params = {
      FunctionName: 'mystery-results-put', // the lambda function we are going to invoke
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: '{ "name" : "Alex" }'
    };
    lambda.invoke(params, function(err, data) {
      if (err) {
        console.error(err);
      } else {
       console.log('Lambda_B said '+ data.Payload);
      }
    })
    });
    // If you are reading this, it is cheating.  I'm not mad, just disappointed...
    const doorData = [{
      number: 1,
      password: 'pantry'
    },
    {
      number: 2,
      password: 'guest room'
    },
    {
      number: 3,
      password: 'kitchen'
    },
    {
      number: 4,
      password: 'bedroom'
    },
    {
      number: 5,
      password: 'bathroom'
    },
    {
      number: 6,
      password: 'den'
    }];

    function toggleDoor(element) {
      element.classList.toggle("doorOpen");
    }

    for (let door of doorData) {
      $(`#door${door.number}-form`).click((event) => {
        openDoor(door.number, door.password);
      });
    }
    $('#final-form').click((event) => {
      let password = $('#final-code').first().val().toLowerCase();
      console.log(password);
      if (password == "270985") { // doors 5, 3, 6, 4, 2, 1
        closeAllDoorsOnFinal();
        toggleDoor(document.querySelector('#door7'));
        if (!hasFinalSolved) $('#myModal').modal();
        hasFinalSolved = true;
        hideError(7);
      } else {
        showError(7);
      }

    });

    $('#key-logo').click(() => {
      $('#secretModal').modal();
    })

    function openDoor(doorNumber, doorPassword) {
      let password = $(`#door${doorNumber}-code`).first().val().toLowerCase();

      if (password === doorPassword) {
        console.log(password + ' ' + doorPassword);
        toggleDoor(document.querySelector(`#door${doorNumber}`));
        hideError(doorNumber);
      } else {
        showError(doorNumber);
      }
    }

    function showError(door) {
      $(`#door${door}Error`).show();
    }

    function hideError(door) {
      $(`#door${door}Error`).hide();
    }

    function hideErrors() {
      $('#door1Error').hide();
      $('#door2Error').hide();
      $('#door3Error').hide();
      $('#door4Error').hide();
      $('#door5Error').hide();
      $('#door6Error').hide();
      $('#door7Error').hide();
    }

    function closeAllDoorsOnFinal() {
      for (let door of doorData) {
        const isOpen = $(`#door${door.number}`).hasClass('doorOpen');
        if (isOpen) {
          toggleDoor(document.querySelector(`#door${door.number}`));
        }
      }
    }
})