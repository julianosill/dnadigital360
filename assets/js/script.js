const stickyHeader = () => {
  const header = document.querySelector('.header');
  const scrollPosition = window.scrollY;
  const scrollDistance = 80;
  scrollPosition >= scrollDistance ? header.classList.add('header--sticky') : header.classList.remove('header--sticky');
};

const scrollToTop = document.querySelector('.scroll-top__button');
scrollToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const showScrollTopButton = () => {
  const container = document.querySelector('.scroll-top');
  const scrollPosition = window.scrollY;
  const scrollDistance = 200;
  scrollPosition >= scrollDistance ? container.classList.remove('hidden') : container.classList.add('hidden');
};

window.addEventListener('scroll', () => {
  showScrollTopButton();
  stickyHeader();
});


const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navMenuLink = document.querySelectorAll('.nav__item a');
const openNavMenu = () => {
  navToggle.setAttribute('aria-expanded', true);
  navMenu.setAttribute('data-visible', true);
};
const closeNavMenu = () => {
  navToggle.setAttribute('aria-expanded', false);
  navMenu.setAttribute('data-visible', false);
};
navToggle.addEventListener('click', () => {
	const expandedMenu = navMenu.getAttribute('data-visible');
	expandedMenu === 'false' ? openNavMenu() : closeNavMenu();
});
navMenuLink.forEach(button => {
	button.addEventListener('click', closeNavMenu);
});


const smoothScroll = (target) => {
  const targetElement = document.querySelector(target);
  if(targetElement) {
    const headerHeight = 60;  // in pixels
    const position = targetElement.offsetTop;
    window.scrollTo({
      top: position - headerHeight,
      behavior: 'smooth'
    });
  };
};

const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
smoothScrollLinks.forEach(element => {
  element.addEventListener('click', () => {
    event.preventDefault();
    const target = element.getAttribute('href');
    smoothScroll(target);
  });
});


async function getData() {
  
  const apiUrl = './assets/js/content.json';
  const response = await fetch(apiUrl);
  const data = await response.json();
  const { benefits, clients, functions, team } = data;

  const addClients = () => {
    const container = document.querySelector('.clients');
    const heading = document.createElement('h4');
    heading.className = 'clients__heading';
    heading.innerText = 'Clientes que confiam em nossos tours';
    container.appendChild(heading);
    const ul = document.createElement('ul');
    ul.className = 'clients__list';
    container.appendChild(ul);
    const addItem = (name, logo, url) => {
      const li = document.createElement('li');
      li.className = 'clients__item';
      li.innerHTML = `
        <a href="${url}" target="_blank">
          <figure>
            <img class="clients__logo" src="${logo}" alt="${name}">
            <figcaption class="clients__name">${name}</figcaption>
          </figure>
        </a>`;
      ul.appendChild(li);
    };
    clients.forEach(client => {
      addItem(client.name, client.logo, client.url);
    });
  };
  addClients();

  const addBenefits = () => {
    const container = document.querySelector('.benefits > .container');
    const ul = document.createElement('ul');
    ul.className = 'benefit__list';
    container.appendChild(ul);
    const addItem = (index, title, text, icon, parent) => {
      const li = document.createElement('li');
      li.className = 'benefits__item';
      li.setAttribute('data-animate', 'fade-top');
      li.setAttribute('data-animate-delay', index);
      li.innerHTML = `
        <div class="benefits__thumb"><i class="benefits__icon ${icon}"></i></div>
        <h6 class="benefits__title">${title}</h6>
        <p class="benefits__text">${text}</p>`;
      parent.appendChild(li);
    };
    benefits.forEach((benefit, index) => {
      addItem(index, benefit.title, benefit.text, benefit.icon, ul);
    });
  };
  addBenefits();

  const addFunctions = () => {
    const addFunctionContent = (index, title, description, image) => {
      const container = document.querySelector('.functions__container');
      const div = document.createElement('div');
      index === 0 ? div.className = 'select__content selected' : div.className = 'select__content';
      div.setAttribute('data-target', index);
      div.innerHTML = `
        <img src="${image}" alt="${title}" class="functions__image">
        <h5 class="functions__item__heading">${title}</h5>
        <p class="functions__item__text">${description}</p>`;
      container.appendChild(div);
    };
    const addFunctionSelector = (index, title, icon) => {
      const selectorList = document.querySelector('.selector__list');
      const li = document.createElement('li');
      li.className = 'select__filter';
      li.innerHTML = `
        <button data-target="${index}" class="select__button">
          <i class="select__icon fa-icon ${icon}"></i> ${title}
        </button>`;
      selectorList.appendChild(li);
      if(index === 0) { document.querySelector('.select__button').classList.add('selected') };
      // Create a selector that shows only in small screens.
      const select = document.querySelector('.selector__mobile');
      const option = document.createElement('option');
      option.setAttribute('value', index);
      option.innerHTML = `${title}`;
      select.appendChild(option);
    };
    functions.forEach((item, index) => {
      addFunctionContent(index, item.name_full, item.description, item.image);
      addFunctionSelector(index, item.name_short, item.icon);
    });    
    // Content selector for functions' section.
    const selector = document.querySelectorAll('[data-target]');
    const toggleSelect = (target) => {
      selector.forEach(item => {
        const targetValue = item.dataset.target;
        target === targetValue ? item.classList.add('selected') : item.classList.remove('selected');
      });
    };
    selector.forEach(selector => {
      if(selector.tagName === 'BUTTON') {
        const target = selector.dataset.target;
        selector.addEventListener('click', () => {
          toggleSelect(target);
        });
      };
    });
    const selectorOption = document.querySelector('.selector__mobile');
    selectorOption.addEventListener('change', () => {
      const option = selectorOption.value;
      toggleSelect(option);
    });
  };
  addFunctions();

  const addTeamMember = () => {
    const container = document.querySelector('.team__members');
    team.forEach((member, index) => {
      const div = document.createElement('div');
      div.className = 'team__person';
      div.setAttribute('data-animate', 'fade-top');
      div.setAttribute('data-animate-delay', index);
      div.innerHTML = `
        <img class="team__photo" src="${member.image}" alt="${member.name}" />
        <div class="team__infos">
          <h5 class="team__name">${member.name}</h5>
          <span class="team__role">${member.role}</span>
          <ul class="team__contacts">
            <li><a href="${member.whatsapp}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a></li>
            <li><a href="${member.mail}" target="_blank"><i class="fa-regular fa-envelope"></i></a></li>
          </ul>
        </div>`;
      container.appendChild(div);
    });
  };
  addTeamMember();

  const animateElements = document.querySelectorAll('[data-animate]');
  const animateOptions = { threshold: 0.15 };
  const animateOnScroll = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const element = entry.target;
      if(entry.isIntersecting) {
        element.classList.add('animate--visible');
        element.classList.remove('animate--hidden');
      };
    });
  }, animateOptions);
  animateElements.forEach(element => {
    const animateClass = element.dataset.animate;
    const animateDelay = element.dataset.animateDelay * 100;
    if(animateDelay) {
      element.classList.add(`animate--delay-${animateDelay}`);
    }
    element.classList.add('animate--hidden', `animate__${animateClass}`);
    animateOnScroll.observe(element);
  });

};
getData();

const counter = document.querySelectorAll('[data-counter]');
const counterOptions = { threshold: 0.5 };
const startCounter = (element, number, speed) => {
  const counted = element.dataset.counted;
  if(!counted) {
    let currentNumber = 0;
    let interval = setInterval( () => {
      currentNumber++;
      element.innerText = currentNumber;
      if(currentNumber >= number) {
        clearInterval(interval);
        element.setAttribute('data-counted', true);
        element.className = 'animate__pop--counter';
      };
    }, speed);
  };
};
const callStartCounter = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const element = entry.target;
    const number = entry.target.dataset.counter;
    const speed = entry.target.dataset.counterSpeed;
    if(entry.isIntersecting) {
      startCounter(element, number, speed);
    };
  });
}, counterOptions);
counter.forEach(element => callStartCounter.observe(element));