let menubtn = document.querySelector(".menu-btn");
let navigation = document.querySelector(".navigation");

menubtn.addEventListener("click", function (){
  menubtn.classList.toggle("active");
  navigation.classList.toggle("active")
})




let btns=document.querySelectorAll(".nav-btn")
let slides=document.querySelectorAll(".video-slide");
let contents=document.querySelectorAll(".content")

 var sliderNav=function(manual){
btns.forEach((btn)=>{
    btn.classList.remove("active")
});
slides.forEach((slide)=>{
   slide.classList.remove("active")
});

contents.forEach((content)=>{
   content.classList.remove("active")
 });
 
    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");
 }

 btns.forEach((btn,i)=>{
    btn.addEventListener("click",function(){
        sliderNav(i)
    })
 })
