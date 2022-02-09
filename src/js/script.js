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
  // validate forms
  new JustValidate('#form',
    {
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
  )
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Field is required',
    },{
      rule: 'minLength',
      value: 3,
      errorMessage: 'Name is too short',
    },{
      rule: 'maxLength',
      value: 30,
      errorMessage: 'Max 30 letters',
    },])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'Field is required',
    },{
      rule: 'email',
      errorMessage: 'Email is invalid!',
    },])
  .addField('#message', [
    {
      rule: 'required',
      errorMessage: 'Field is required',
    },{
      rule: 'minLength',
      value: 15,
      errorMessage: 'Message is too short',
    },{
      rule: 'maxLength',
      value: 300,
      errorMessage: 'Max 300 letters',
    },]);
  // :::: my JS functions ::::
  console.log('script is working');
  myfun.isWebp();
  myfun.scrollingAnim('.anim-item');

  // variables
  const
  item = document.querySelectorAll('.portfolio__projectBox'),
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
  new Swiper('.portfolio__swiper', {
    // Optional parameters
    direction: 'horizontal',
    effect: 'fade',
    // loop:true,
    speed:700,
    allowTouchMove: true,
    // spaceBetween: 30,
    slidesPerView: 1,
    slidesPerGroup:1,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".swiper-pagination",
      bullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // portfolio projects add focus efects, and open modal windo if button is clicked
  document.querySelectorAll('.portfolio__projectBox-btn').forEach(function(el) {
    // variablles
    const thisParent = document.querySelectorAll('.portfolio__projectBox-info');
    // focus state
    el.addEventListener('focus' , function(ev) {
      if(ev.target.classList.contains('focus-visible')){
        el.parentNode.classList.add('is-active');
      }
    });
    // blur state
    el.addEventListener('blur', function() {
      // removing class active from all elements
      for (let i = 0; i < thisParent.length; i++) {
        thisParent[i].classList.remove('is-active');
      }
    });
    // click state
    el.addEventListener('click' , function(e) {
      myfun.fade(modalWindow , 500 , 'flex');

      document.querySelector('.portfolio__btn-next').focus();
      document.querySelector('.portfolio__btn-next').classList.add('focus-visible');

      htmlBody.style.overflow = 'hidden';

      // jquery scroll code
      e.preventDefault();
      $('body,html').animate({ scrollTop: $('#portfolio').offset().top - nav.clientHeight}, 500);
    });
  });

    document.querySelector('.portfolio__btn-next').addEventListener('blur' , () => {
    document.querySelector('.portfolio__btn-next').classList.remove('focus-visible');
  });
  // cencel modal window
  document.querySelector('.portfolio__modal-cancel').addEventListener('click' , function() {
    myfun.unfade(modalWindow , 500);
    htmlBody.style.overflow = 'overlay';
  })

  document.querySelector('.portfolio__modal-cancel').addEventListener('blur' , () => {
    if(document.querySelector('.portfolio__btn-prev').classList.contains('swiper-button-disabled')){
      document.querySelector('.portfolio__btn-next').focus();
      document.querySelector('.portfolio__btn-next').classList.add('focus-visible');
    } else {
      document.querySelector('.portfolio__btn-prev').focus();
      document.querySelector('.portfolio__btn-prev').classList.add('focus-visible');
    }
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

