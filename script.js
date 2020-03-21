$(() => {
    var element = document.querySelector("#door1");
    element.addEventListener("click", toggleDoor);

    var door2 = document.querySelector("#door2");
    door2.addEventListener("click", toggleDoor);

    var door3 = document.querySelector("#door3");
    door3.addEventListener("click", toggleDoor);
    
    function toggleDoor() {
      element.classList.toggle("doorOpen");
    }
})
