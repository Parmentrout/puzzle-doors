AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:687b1ef2-20a7-4a7b-908a-e23815ac0c87'
})
const lambda = new AWS.Lambda({apiVersion: '2015-03-31'});
   
const params = {
  TableName: "mystery-results",
  Item: event
};
const sessionKey = 'lockedInMystery';
$(() => {
    hideErrors();
    let hasFinalSolved = false;

    let sessionData = getSessionData();
    if (!sessionData) {
      $('#sessionSubmit').click((event) => {
        const email = $('#emailInput').val();
        const company = $('#companyInput').val();
        const optInInput = $('#optInInput').prop('checked');

        sessionData = {email: email, company: company, optIn: optInInput};
        console.log(sessionData);
        saveToSession(sessionData);
        saveData('start');
        $('#emailModal').modal('hide');
      });

      $('#emailModal').modal({backdrop: 'static', keyboard: false});
    }
    //
    $('#clear-session').click(e => removeFromSession());

    $('#successModal').on('hide.bs.modal', function () {
      removeFromSession();
    })
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

      if (password == "270985") { // doors 5, 3, 6, 4, 2, 1
        solvedPuzzle();
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
        saveData(`Door ${doorNumber} opened successfully`)
        toggleDoor(document.querySelector(`#door${doorNumber}`));
        hideError(doorNumber);
      } else {
        saveData(`Door ${doorNumber} attempted with invalid password: ${password}`);
        showError(doorNumber);
      }
    }

    function solvedPuzzle() {
      closeAllDoorsOnFinal();
      toggleDoor(document.querySelector('#door7'));
      if (!hasFinalSolved) {
        $('#successModal').modal();
      }
      saveData('stop');
      hasFinalSolved = true;
      hideError(7);
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

    function saveData(event) {
      const payload = `{
        "email": "${sessionData.email}",
        "company": "${sessionData.company}",
        "optIn": ${sessionData.optIn},
        "eventName": "${event}",
        "time": ${Date.now()}
      }`;
      
      var params = {
        FunctionName: 'mystery-results-put', // the lambda function we are going to invoke
        InvocationType: 'RequestResponse',
        Payload: payload
      };
      lambda.invoke(params, function(err, data) {
        if (err) {
          console.error(err);
        } else {
          console.log('Mystery Put said '+ data.Payload);
          const json = JSON.parse(data.Payload);
          if (json && json.data && json.data.totalTime) {
            const totalTime = json.data.totalTime;
            if (totalTime > 0) {
              $('#totalTime').text(msToTime(totalTime));
            }
          }
        }
      })
    }

    // Session data
    function getSessionData() {
      let result = window.sessionStorage.getItem(sessionKey); 
      if (!result) { return null; }
      return JSON.parse(result);
    }

    function saveToSession(sessionData) {
      removeFromSession();
      window.sessionStorage.setItem(sessionKey, JSON.stringify(sessionData));
    }

    function removeFromSession() {
      window.sessionStorage.removeItem(sessionKey);
    }

    //Time function
    function msToTime(duration) {
      var milliseconds = parseInt((duration%1000)/100)
          , seconds = parseInt((duration/1000)%60)
          , minutes = parseInt((duration/(1000*60))%60)
          , hours = parseInt((duration/(1000*60*60))%24);
  
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
  
      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
})