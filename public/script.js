const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
 // toggle nav
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
  //animate links
    navLinks.forEach((link, index) => {
      if(link.style.animation){
        link.style.animation = '';
      }
      else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    });
    //buger animation
    burger.classList.toggle('toggle');
  });
}

navSlide();

$(document).ready(function(){
  
  $('.nav-item').click(function(){
    $('.nav-item').removeClass("active");
    $(this).addClass("active");
  });
});


var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-120px";
  }
  prevScrollpos = currentScrollPos;
}

//.active{
//  border-bottom: solid 3px #215e4c;
//}


$(document).ready(function(){ });


