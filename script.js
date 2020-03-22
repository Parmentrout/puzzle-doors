$(() => {

    // If you are reading this, it is cheating.  I'm not mad, just disappointed...
    const door1Password = 'pantry';

    function toggleDoor(element) {
      element.classList.toggle("doorOpen");
    }

    $('#door1-form').click((event) => {
      event.preventDefault();
      let password = $('#door1-code').first().val().toLowerCase();

      console.log(password);
      if (password === door1Password) {
        toggleDoor(document.querySelector("#door1"));
      }
    });

    $('#door2-form').submit((event) => {
      event.preventDefault();
      let password = $('#door2-form').first().val().toLowerCase();

      if (password === "test") {
        toggleDoor(document.querySelector("#door2"));
      }
      console.log(password);
    });
})


//https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=96UBSEFHB6NA2&currency_code=USD&source=url