$(() => {
    hideErrors();
    
    // If you are reading this, it is cheating.  I'm not mad, just disappointed...
    const doorData = [{
      number: 1,
      password: 'pantry'
    },
    {
      number: 2,
      password: 'alehljelakhef'
    },
    {
      number: 3,
      password: 'kitchen'
    },
    {
      number: 4,
      password: 'alehfleahl'
    },
    {
      number: 5,
      password: 'alfeyhleljllhael'
    },
    {
      number: 6,
      password: 'alfehlafelhale'
    }];

    function toggleDoor(element) {
      element.classList.toggle("doorOpen");
    }

    for (let door of doorData) {
      $(`#door${door.number}-form`).click((event) => {
        openDoor(door.number, door.password);
      });
    }

    $('final-form').click((event) => {
      openDoor(7, '86876868765');
    });

    function openDoor(doorNumber, doorPassword) {
      let password = $(`#door${doorNumber}-code`).first().val().toLowerCase();

      if (password === doorPassword) {
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
      $('#finalError').hide();
    }
})