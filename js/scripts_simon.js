
////// MENU HOVER COLOR

function changeColorIn_home() {
    var fond = document.getElementById("Menu_background");
    fond.classList.toggle('active_home');
}
function changeColorOut_home() {
    var fond = document.getElementById("Menu_background");
    fond.classList.toggle('active_home');
}

function changeColorIn_work() {
    var fond = document.getElementById("Menu_background");
    fond.classList.toggle('active_work');
}
function changeColorOut_work() {
    var fond = document.getElementById("Menu_background");
    fond.classList.toggle('active_work');
}
function changeColorIn_infos() {
    var fond = document.getElementById("Menu_background");
    fond.classList.toggle('active_infos');
}
function changeColorOut_infos() {
    var fond = document.getElementById("Menu_background");
    fond.classList.toggle('active_infos');
}

////// CALL THE MOBILE MENU

function loadmenu() {
      var archive = document.getElementById("liste_slide_mobile");
      var bodyscroll = document.getElementById("johl");
      var arrow = document.getElementById("animationfleche");
      var arrowsec = document.getElementById("animationflechedeux");
      archive.classList.toggle('close');
      bodyscroll.classList.toggle('noscroll');
      arrow.classList.toggle('tourne');
      arrowsec.classList.toggle('tournedeux');

}
function hidemenu() {
      var archive = document.getElementById("liste_slide_mobile");
      var bodyscroll = document.getElementById("johl");
      var arrowclose = document.getElementById("animationfleche");
      var arrowsecclose = document.getElementById("animationflechedeux");
      archive.classList.toggle('close');
      bodyscroll.classList.toggle('noscroll');
      arrowclose.classList.toggle('tourne');
      arrowsecclose.classList.toggle('tournedeux');
}
function remove_no_scroll() {
      var bodyscroll = document.getElementById("johl");
      if (bodyscroll.classList.contains("noscroll")) {
       bodyscroll.classList.remove("noscroll");
     }
}

////// CALL THE INFO

function fn(e) {
	var tooltip = document.querySelectorAll('.post_hover');
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = e.clientX + 'px';
        tooltip[i].style.top = e.clientY + 'px';
    }
}

function myFunction(i) {
        var box = document.getElementById(i + '_liste');
        box.style.opacity = 1;
        box.style.display = 'block';
        box.style.position = 'fixed';
}

function normalImg(p) {
    var box = document.getElementById(p + '_liste');
    box.style.opacity = 0;
    box.style.display = 'none';
    box.style.position = 'absolute';
}

function listeFunc(i) {
    var box = document.getElementById(i + '_box');
    box.style.display = 'block';
    box.style.position = 'fixed';

}
function listeFuncOut(p) {
    var box = document.getElementById(p + '_box');
    box.style.display = 'none';
   box.style.position = 'absolute';
}

//////

function PageTransition(){
    var tl = gsap.timeline();
    tl.to('.rendu', {duration: 0.5, opacity: 0})
}
function PageTransitionEnter(){
    var tl = gsap.timeline();
    tl.from('.rendu', {duration: 0.5, opacity: 0})
}

function AddCurrentClass(){
  var lien_actif = window.location.href;
  var currentURLLink = document.querySelector("a.link_to_post[href='"+lien_actif+"']");
  var parent = currentURLLink.parentNode;

  const active = document.querySelector('.current');
  if(active){
    active.classList.remove('current');
  }
  parent.classList.add('current');
}

function displaynone() {
  var box = document.getElementById('listing');
  myVar = setTimeout(function(){  box.style.display = 'none'; }, 700);
}

function ListeTransition(){
     var tl = gsap.timeline();
     tl.to('.liste', {duration: 0.5, opacity: 0});
     displaynone();
}
function ListeTransitionEnter(){
    var box = document.getElementById('listing');
     box.style.display = 'block';
     var tl = gsap.timeline();
     tl.to('.liste', {duration: 0.5, opacity: 1})
     box.scrollTo(0, 0);
}
function contentAnimation(){
    var tl = gsap.timeline();
    tl.from('.first', {duration: 0.5, x: 30, opacity: 0, stagger: 0.4 })
    tl.from('.second', {duration: 0.5,  x: 30, opacity: 0, stagger: 0.4 }, '.1')
    tl.from('.third', {duration: 0.5,  x: 30, opacity: 0, stagger: 0.4 }, '.1')
}


////

function hide_liste(){
  var tl = gsap.timeline();
  tl.from('.liste', {duration: 0.5, opacity: 0 })
}
function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}


barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});


barba.init({
    sync: true,
    transitions: [

        {
        name: 'default',
        async beforeOnce(data) {
          AddCurrentClass();
        },

        async leave(data) {
            const done = this.async();
            PageTransition();
            await delay(700);
            done();

        },
        async enter(data) {
            PageTransitionEnter();
            contentAnimation();
        },
        async once(data) {

        }
    },
    {
    name: 'liste_Current',
    from: {
        custom: ({ trigger }) => {
          if (trigger.classList && trigger.classList.contains('link_to_post')) {
            return true
          }
        }
      },
    async leave(data) {
        const done = this.async();
        PageTransition();
        await delay(700);
        done();

    },
    async enter(data) {
        AddCurrentClass();
        PageTransitionEnter();
        contentAnimation();
    },
},
    {
      name: 'menu_end',
      from: {
          custom: ({ trigger }) => {
            if (trigger.classList && trigger.classList.contains('menulienmobile')) {
              return true
            }
          }
        },
        async leave(data) {
          const done = this.async();
          await delay(700);
          PageTransition();
          ListeTransition(); // disparition de la liste
          done();
      },
      async enter(data) {
            PageTransitionEnter();
          remove_no_scroll();// disparition de la class no scroll body

      },
    },
    {
        name: 'effet de fade pour la liste et la page lors de la fermeture',
        from: {
            custom: ({ trigger }) => {
              if (trigger.classList && trigger.classList.contains('homepage')) {
                return true
              }
              if (trigger.classList && trigger.classList.contains('nav-link')) {
                return true
              }
            }
          },
          async leave(data) {
            const done = this.async();
            PageTransition();
            ListeTransition(); // disparition de la liste
            remove_no_scroll();// disparition de la class no scroll body
            await delay(700);
            done();
        },
        async enter(date) {
            PageTransitionEnter();
        },
    },
    {
        name: 'Fade la liste lors de larrivé apres avoir été sur la home',
        from: {
            custom: ({ trigger }) => {
              if (trigger.classList && trigger.classList.contains('linked')) {
                return true
              }
            }
          },
          async beforeOnce(data) {
            ListeTransitionEnter();
          },
          async leave(data) {
              const done = this.async();
              PageTransition();
              await delay(700);
              done();
          },
          async enter(data) {
            PageTransitionEnter();
            AddCurrentClass();
            contentAnimation();
            ListeTransitionEnter();
        },
        async once(date) {
            contentAnimation();
        }
    },
],
})
