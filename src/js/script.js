// import diferents modules:
import * as myfun from "./modules/functions.js"
import * as canv from "./modules/canvas.js"
import Swiper, { Navigation, Pagination } from 'swiper';
import $, { css } from "jquery";
import "focus-visible";
import LazyLoad from "vanilla-lazyload";
import JustValidate from 'just-validate';

Swiper.use([Navigation, Pagination]);

window.addEventListener('DOMContentLoaded', function () {
  const vhCalc = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  vhCalc()
  window.addEventListener('resize', ()=> {
    vhCalc();
  });
  // connect lazy load
  new LazyLoad({
    elements_selector: '.lazy' ,
  });

  // :::: my JS functions ::::
  console.log('script is working');
  myfun.isWebp();
  myfun.scrollingAnim('.anim-item');

  const validateForms = (selector, rules, afterSend) => {
    const form = document?.querySelector(selector);

    if (!form) {
      console.error('Нет такого селектора!');
      return false;
    }

    if (!rules) {
      console.error('Вы не передали правила валидации!');
      return false;
    }

    const validation = new JustValidate(selector, {
      errorFieldCssClass: 'is-invalid',
      errorLabelCssClass: 'input-invalid',
      errorLabelStyle: {
        color: '#DF3600',
        textDecoration: 'underlined',
        fontFamily: 'Arial, sans-serif',
        fontSize: '13px',
        fontWeight: '500',
        position: 'absolute',
        top: '-15px',
        left: '23px',
      },
    },
      [
        {
          key: 'Name is too short',
          dict: {
            ru: 'Имя слишком короткое',
            es: 'El nombre es muy corto',
          },
        },
        {
          key: 'Message is too short',
          dict: {
            ru: 'Сообщение слишком короткое',
            es: 'Mensaje es muy corto',
          },
        },
        {
          key: 'Max 30 letters',
          dict: {
            ru: 'Максимум 30 букв',
            es: 'Máx 30 letras',
          },
        },
        {
          key: 'Max 300 letters',
          dict: {
            ru: 'Максимум 300 букв',
            es: 'Máx 300 letras',
          },
        },
        {
          key: 'Email is invalid!',
          dict: {
            ru: 'Email недействителен!',
            es: 'Email es invalido!',
          },
        },
        {
          key: 'Field is required',
          dict: {
            ru: 'Обязательное поле',
            es: 'Se requiere campo',
          },
        },
      ]
    );

    for (let item of rules) {
      validation
        .addField(item.ruleSelector, item.rules);
    }

    validation.onSuccess(e => afterSend(e));

  };
  // variables
  const
  projects = document.querySelector('.portfolio__projects'),
  modalWindow = document.querySelector('.portfolio__modal'),
  htmlBody = document.querySelector('html , body'),
  nav  = document.querySelector('.nav');
  // :::: my jquery ::::

  // scroll to elemens using navigation(.nav)
  $(".nav__link").on("click", function (e) {
    e.preventDefault();
    let id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top - nav.clientHeight}, 500);
  })
  // header btns scroll to selected element
  $(".header__btn").on("click", function (e) {
    e.preventDefault();
    let id = $(this).data('href'),
      top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top - nav.clientHeight}, 500);
  })


  // :::::::::: my JavaScript ::::::::::::::
  const allProjects = fetch("https://shypot.vercel.app/files/projects.json")
  .then(response => response.json())
  .then(data => data.menu.portfolio)
  .then(data => {
    if (data) {
      projects.innerHTML = '';

      data.forEach(el => {
        projects.innerHTML += `
        <div class="portfolio__projectBox" data-item="${el.filter}">
          <img class="lazy portfolio__projectBox-img entered loaded" data-src="${'https://shypot.vercel.app/' + el.img}" alt="${el.altimg}" data-ll-status="loaded" src="${'https://shypot.vercel.app/' + el.img}">
          <div class="portfolio__projectBox-info">
            <h3 class="subtitle">${el.title}</h3>
            <p class="portfolio__projectBox-text">${el.descr}</p>
            <button data-link="${el.link}" data-alt="${el.altimg}" data-src="${'https://shypot.vercel.app/' + el.img}" class="portfolio__projectBox-btn">Learn more</button>
          </div>
        </div>
      `;
      });

      projects.innerHTML += `
        <div class="portfolio__projectBox-not">
          <div class="portfolio__projectBox-not-cnt">
            <img class="lazy portfolio__projectBox-not-img" src="img/no-projects.jpg" alt="not projects">
            <span class="portfolio__projectBox-not-text">Projects under development</span>
            <span class="portfolio__projectBox-not-text">Sorry :(</span>
          </div>
        </div>
      `;
    }
  })
  .catch(err => console.error(err))

  // buttons array, clases (.portfolio__btn)
  document.querySelectorAll('.portfolio__btn').forEach(function(el) {
    // add event for array element
    el.addEventListener('click' , function(event) {
      let dataFilter      = this.dataset.filter;
      const thisBtns      = document.querySelectorAll('.portfolio__btn');
      const projectHide   = document.querySelector('.portfolio__projectBox-not');
      // check if exist class active, if not add
      if(event.target.classList.contains('active')) {
        event.target.classList.remove('active');
        event.target.classList.add('active');
      } else {
        for (let i = 0; i < thisBtns.length; i++) {
          thisBtns[i].classList.remove('active');
        }
        event.target.classList.add('active');

        // add class is-active if project is not exist
        projectHide.classList.add('is-active');

        // review array clases
        const item = document.querySelectorAll('.portfolio__projectBox');
        item.forEach(el => el.style.transitionDelay = '0s');
        for (let j = 0; j < item.length; j++) {
          // check dataAtribute for category
          let itemData = item[j].getAttribute('data-item').split(" ");
          // add transform a portfolio items
          item[j].style.transform = 'scale(0)';
          setTimeout(() => {
            item[j].classList.remove('active');
            item[j].classList.add('hidden');
            // if dataAtribute is true (if is false add class hidden)
            if(dataFilter == itemData.filter(el => el === dataFilter) || dataFilter == "all"){
              item[j].classList.remove('hidden');
              item[j].classList.add('active');
              item[j].style.transform = 'scale(1)';
              projectHide.classList.remove('is-active');
            }
          }, 300);
          if(dataFilter == itemData.filter(el => el === dataFilter) || dataFilter == "all")
            projectHide.classList.remove('is-active');
        }
      }
    });
  });

  // portfolio Slide
  // new Swiper('.portfolio__swiper', {
  //   // Optional parameters
  //   direction: 'horizontal',
  //   effect: 'fade',
  //   // loop:true,
  //   speed:700,
  //   allowTouchMove: true,
  //   // spaceBetween: 30,
  //   slidesPerView: 1,
  //   slidesPerGroup:1,
  //   fadeEffect: {
  //     crossFade: true,
  //   },
  //   pagination: {
  //     el: ".swiper-pagination",
  //     bullets: true,
  //   },
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  // });

  // custom form configuration
  function formSubmit() {
    // add changes to form validate
    const rules = [{
      ruleSelector: '#name',
      rules: [{
        rule: 'minLength',
        value: 3,
        errorMessage: 'Min 3 letters'
      }, {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Max 20 letters'
      }, {
        rule: 'required',
        value: true,
        errorMessage: '*Name is Required'
      }]
    }, {
      ruleSelector: '#email',
      rules: [{
        rule: 'required',
        value: true,
        errorMessage: '*Email is Required'
      }, {
        rule: 'email',
        errorMessage: 'Email is invalid!',
      }]
    }, {
      ruleSelector: '#message',
      tel: true,
      rules: [{
        rule: 'required',
        value: true,
        errorMessage: '*Message is Required'
      }, {
        rule: 'minLength',
        value: 15,
        errorMessage: 'Min 15 letters'
      }, {
        rule: 'maxLength',
        value: 500,
        errorMessage: 'Max 500 letters'
      },]
    },];

    const afterForm = e => {
      e.preventDefault();

      const form = e.target;
      console.log(form)
      const status = form.querySelector('.contact__state');

      // function to set status of form
      const setStatus = (text, className, btn = true) => {
        status.textContent = text;
        status.classList.add(className);
        setTimeout(() => status.classList.remove(className), 10000);

        if (btn) {
          form.querySelector('.contact__btn').setAttribute('disabled', true);
          form.querySelector('.contact__btn').style.cssText = 'cursor:initial;border-color:#333;color:#333;background-color:transparent;animation: none; opacity: .5;';
        }
      }


      if (localStorage.getItem("sendedForm")) {
        setStatus('Oops! You have already sent a letter', 'error');
        return;
      }

      const data = new FormData(form);
      fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          setStatus('Thanks for your message!', 'sended');
          // add to storage that form was sended
          localStorage.setItem("sendedForm", true)
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.textContent = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.textContent = "Oops! There was a problem submitting your form";
            }
          })
        }
      }).catch(error => {
        setStatus('Oops! There was a problem submitting your form', 'error', false);
      });
    };

    // validate and send form
    validateForms('#form', rules, afterForm);
  }

  formSubmit();
    // click state
    projects.addEventListener('click' , function(e) {
      if (e.target.classList.contains('portfolio__projectBox-btn')) {
        document.querySelector('.portfolio__slide').previousElementSibling.setAttribute('data-srcset', e.target.dataset.src.replace(/.\..+/gs, '.webp'));
        document.querySelector('.portfolio__slide').previousElementSibling.setAttribute('srcset', e.target.dataset.src.replace(/.\..+/gs, '.webp'));
        document.querySelector('.portfolio__slide').dataset.src = e.target.dataset.src;
        document.querySelector('.portfolio__slide').setAttribute('src', e.target.dataset.src);
        document.querySelector('.portfolio__slide').setAttribute('alt', e.target.dataset.alt);

        // link, title
        document.querySelector('.portfolio__modal-textBox .subtitle').innerHTML = e.target.previousElementSibling.previousElementSibling.textContent;
        document.querySelector('.portfolio__modal-description').innerHTML = e.target.previousElementSibling.textContent;
        document.querySelector('.portfolio__modal-btn').setAttribute('href', e.target.dataset.link);

        myfun.fade(modalWindow , 500 , 'flex');

        htmlBody.style.overflow = 'hidden';

        // jquery scroll code
        e.preventDefault();
        $('body,html').animate({ scrollTop: $('#portfolio').offset().top - nav.clientHeight}, 500);
      }
    });
  // cencel modal window
  document.querySelector('.portfolio__modal-cancel').addEventListener('click' , function() {
    myfun.unfade(modalWindow , 500);
    htmlBody.style.overflow = 'overlay';
  })


  // heart click animation (jquery code animation)
  $('.heart').on('click', function (e) {
    $(this).toggleClass('active');
    $('<span class="cursor">')
      .css({
        top: e.clientY,
        left: e.clientX
      })
      .appendTo($(document.body))
      .on('animationend webkitAnimationEnd', function (e) {
        $(this).remove();
      });
  });
  // function usage: myfun.consoleText(['texts' , 'Hello word', 'etc..'], 'class or id', spead, [colors, red, green, blue])
  myfun.consoleText(['Hello, i’m Nazar.', 'I like js animations.'],'.header__title');
  // add evnt scroll to window
  window.addEventListener('scroll', () => {
    // create scrollY variable
    let scrollDistance = window.scrollY;
    const item = document.querySelectorAll('.nav__item');
    // add used in navigation (elements)
    document.querySelectorAll('.header , .section').forEach((el,i) => {
      // calculate height to element and rest navigation height
      if(el.offsetTop - nav.clientHeight <= scrollDistance) {
        // check links for class 'active'
        document.querySelectorAll('.nav__link').forEach((el) => {
          // if class active exist , remove this class
          if(el.classList.contains('active'))el.classList.remove('active');
        });
        // add class 'active' to link use index from element
        item[i].querySelector('a').classList.add('active');
        if(item[1].querySelector('a').classList.contains('active')){
          document.querySelector('.about').style.marginTop = `${nav.offsetHeight}px`;
          nav.style.position = 'fixed';
          nav.style.top = '0';
        } else if(item[0].querySelector('a').classList.contains('active')) {
          document.querySelector('.about').style.marginTop = `0px`;
          nav.style.position = 'static';
        }
      }
    });

  });
});

