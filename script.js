const name = document.getElementById('firstName');
const subject = document.getElementById('subject');
const message = document.getElementById('textMessage');
const email = document.getElementById('email');

function validateName() {

   //only have alphabets
   const regex = /^[a-zA-Z ]+$/;

   if (checkIfEmpty('name')) return;

   else if (!(regex.test(name.value))) {
      return setInvalid(name, 'Only letters are allowed')
   }
   name.nextElementSibling.innerHTML = '';
}

function validateEmail() {
   //email pattern regex
   const regex = /^["]*[^-+'.@](\w*([-+'.]{1}\w+)*)*["]*@\w+([-.]\w+)*\.[A-Za-z]+$([-.][A-Za-z]+$)*/;

   if (checkIfEmpty('email')) return;

   else if (!(email.value.match(regex))) {
      return setInvalid(email, 'Enter a valid email')
   }
   email.nextElementSibling.innerHTML = '';
}

function checkIfEmpty(input) {
   const elements = {
      'name': name,
      'subject': subject,
      'textMessage': message,
      'email': email
   };
   //if input = subject 
   //elements.subject OR elements['subject']
   const field = elements[input];

   //check if empty
   if (!field.value || field.value === '') {
      setInvalid(field, `${field.name} is mandatory`);
      return true;
   }
   field.nextElementSibling.innerHTML = '';
}

function setInvalid(field, message) {
   field.nextElementSibling.innerHTML = message;
   field.nextElementSibling.style.color = '#F44336';
   field.nextElementSibling.style.position = 'absolute';
}



//portfolio item
const filterContainer = document.querySelector("#portfolio-filter");
const filterBtns = filterContainer.children;
const totalFilterBtn = filterBtns.length;
const portfolioItems = document.querySelectorAll(".portfolio-item");
const totalPortfolioItem = portfolioItems.length;


for (let i = 0; i < totalFilterBtn; i++) {

   filterBtns[i].addEventListener("click", function() {
      filterContainer.querySelector(".active").classList.remove("active");
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      for (let k = 0; k < totalPortfolioItem; k++) {
         if (filterValue === "all" || filterValue === portfolioItems[k].getAttribute("data-category")) {
            portfolioItems[k].classList.remove("hide");
            portfolioItems[k].classList.add("show");
         } else {
            portfolioItems[k].classList.remove("show");
            portfolioItems[k].classList.add("hide");
         }
      }
   })
}

//portfolio lightbox
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxText = lightbox.querySelector(".caption-text");
const lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;



for (let k = 0; k < totalPortfolioItem; k++) {
   portfolioItems[k].addEventListener("click", function() {
      itemIndex = k;
      changeItem();
      toggleLightbox();
   })

}
//changing the the image when click
function nextItem() {
   if (itemIndex === totalPortfolioItem - 1) {
      itemIndex = 0;
   } else {
      itemIndex++;
   }
   changeItem();

}

function prevItem() {
   if (itemIndex === 0) {
      itemIndex = totalPortfolioItem - 1;
   } else {
      itemIndex--;
   }
   changeItem();

}

function toggleLightbox() {
   lightbox.classList.toggle("lightBoxOpen");
}

function changeItem() {
   imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
   lightboxImg.src = imgSrc;
   lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
   lightboxCounter.innerHTML = (itemIndex + 1) + " of" + totalPortfolioItem;

}
//close lightbox
lightbox.addEventListener("click", function(event) {
   if (event.target === lightboxClose || event.targetlightbox) {
      toggleLightbox();

   }
})

//couunter up js
const counters = document.querySelectorAll(".counter");
const speed = 200;

counters.forEach(function(counter) {
   const updCount = function() {
      const target = counter.getAttribute('data-target');
      const count = +counter.innerText;

      const score = target / speed;

      if (count < target) {
         counter.innerText = count + score;
         setTimeout(updCount, 1);
      } else {
         counter.innerText = target;
      }
   }
   updCount();

});