//js function for dark mode switch

document.getElementById("toggle-theme").addEventListener("click", function() {
  // Get the body element
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  
  // Toggle the "dark" class on the body
  body.classList.toggle("dark");
  header.classList.toggle("headfootdark");
  footer.classList.toggle("headfootdark");

  // Check if the 'dark-theme' class is applied to the body element
  if (body.classList.contains("dark")) {
    // Change the navigation text color to white
    document.querySelectorAll('nav a').forEach(function(navItem) {
      navItem.style.color = 'white';
    });
    document.getElementById("toggle-theme").style.color = '#060627';
    document.getElementById("toggle-theme").style.backgroundColor = 'white';
    document.getElementById("toggle-theme").innerText = 'Light Theme';
    document.getElementById("playAgain").style.color = '#060627';
    document.getElementById("playAgain").style.backgroundColor = 'white';
    document.getElementById("playNew").style.color = '#060627';
    document.getElementById("playNew").style.backgroundColor = 'white';
    document.getElementById("playQuit").style.color = '#060627';
    document.getElementById("playQuit").style.backgroundColor = 'white';
    document.getElementsByClassName("newgame")[0].style.color = "white";
    document.getElementsByClassName("newgame")[0].style.backgroundColor = '#060627';
    document.getElementsByClassName("newgame")[0].style.borderColor= 'white';
  } 
  else {
    // Change the navigation text color back to black
    document.querySelectorAll('nav a').forEach(function(navItem) {
      navItem.style.color = 'black';
  });
  document.getElementById("toggle-theme").style.color = 'white';
  document.getElementById("toggle-theme").style.backgroundColor = '#060627';
  document.getElementById("toggle-theme").innerText = 'Dark Theme';
  document.getElementById("playAgain").style.color = 'white';
  document.getElementById("playAgain").style.backgroundColor = '#060627';
  document.getElementById("playNew").style.color = 'white';
  document.getElementById("playNew").style.backgroundColor = '#060627';
  document.getElementById("playQuit").style.color = 'white';
  document.getElementById("playQuit").style.backgroundColor = '#060627';
  document.getElementsByClassName("newgame")[0].style.color = "black";
    document.getElementsByClassName("newgame")[0].style.backgroundColor = 'rgb(207, 239, 253)';
    document.getElementsByClassName("newgame")[0].style.borderColor= 'black';
}
});