$(() => {
    let door1 = document.querySelector("#door1");
    //door1.addEventListener("click", toggleDoor);

    let door2 = document.querySelector("#door2");
   // door2.addEventListener("click", toggleDoor);

    let door3 = document.querySelector("#door3");
    door3.addEventListener("click", toggleDoor);
    
    function toggleDoor(element) {
      element.classList.toggle("doorOpen");
    }

    function openDoor(door) {
      console.log(door);
      //toggleDoor(document.querySelector("#door1"));
    }

    $('#door1-form').click((event) => {
      event.preventDefault();
      let password = $('#door1-code').first().val().toLowerCase();

      console.log(password);
      
      if (password === "test") {
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
