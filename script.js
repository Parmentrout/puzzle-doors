$(() => {
    hideErrors();
    // If you are reading this, it is cheating.  I'm not mad, just disappointed...
    const door1Password = 'pantry';

    function toggleDoor(element) {
      element.classList.toggle("doorOpen");
    }

    $('#door1-form').click((event) => {
      event.preventDefault();
      openDoor(1);
    });

    function openDoor(doorNumber) {
      let password = $(`#door${doorNumber}-code`).first().val().toLowerCase();

      console.log(password);
      if (password === door1Password) {
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
    
    function storeResults(door) {
      //let 
    }

    function getOpenDoors() {
      localStorage.getItem('doorSolved');
    }
})