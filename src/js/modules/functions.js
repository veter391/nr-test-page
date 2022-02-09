export function isWebp() {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    const bodyClasses = document.querySelector('body').classList;
    support === true ? bodyClasses.add('webp') : bodyClasses.add('no-webp');
  });
}

export function scrollingAnim(cl) {
  const animItems = document.querySelectorAll(cl);

  if (animItems.length > 0) {
    window.addEventListener('scroll' , animOnScroll);
    function animOnScroll(){
      for (let i = 0; i < animItems.length; i++) {
        const animItem        = animItems[i];
        const animItemHeight  = animItem.offsetHeight;
        const animItemOffset  = offset(animItem).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if(animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
          animItem.classList.add('_active');
        } else {
          if(!animItem.classList.contains('anim-no-hide'))
          animItem.classList.remove('_active');
        }
      }
    }
    setTimeout(() => {
      animOnScroll();
    }, 300);
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop  = window.pageYOffset || document.documentElement.scrollTop;

    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
}

export function fade(element, timeout, display) {
  element.style.opacity = 0;
  element.style.display = display || 'block';
  element.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 10);
}

export function unfade(element, timeout) {
  element.style.opacity = 1;
  element.style.transition = `opacity ${timeout}ms`;
  element.style.opacity = 0;

  setTimeout(() => {
    element.style.display = 'none';
  }, timeout);
}

export function consoleText(words, element, spead, colors) {
  // create variavles
  let visible, letterCount , x , waiting ,target ,usedColor ,usedWord , timerSpead;
  timerSpead = spead || 120 ;
  // create span element
  const line = document.createElement("span");
  // add span element to DOM
  document.querySelector('.header__title-box').appendChild(line);
  // add content to span using inner html
  line.innerHTML = "&#124;";
  // adding styles from created span
  line.style.display = 'inline-block';
  line.style.position = 'relative';
  line.style.left = '-0.05em';

  // if not adding colors to fonction add defaul color white
  if (colors === undefined) colors = ['#fff'];
  // default leteterCounter and x = 1, waiting = false
  letterCount = 1;
  x = 1;
  waiting = false;
  // add function selector
  target = document.querySelector(element)
  // add style atribute if existe diferents colors
  target.setAttribute('style', 'color:' + colors[0])
  // timer function spead for add letters
  window.setInterval(() => {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(() => {
        usedColor = colors.shift();
        colors.push(usedColor);
        usedWord = words.shift();
        words.push(usedWord);
        // variavle x add 1, adding letter
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      // timer function spead for remove letters
      window.setTimeout(() => {
        // variavle x add -1, removeing letter
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, timerSpead)
  // created span(line) add and remove opacity timer
  window.setInterval( () => {
    if (visible !== true) {
      line.style.opacity = 1;
      visible = true;
    } else {
      line.style.opacity = 0;
      visible = false;
    }
  }, 400)
}

