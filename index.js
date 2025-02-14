document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.prompt form');
    const name = document.querySelector('#name');
    const card = document.querySelector('.card');
    const prompt = document.querySelector('.prompt');
  
    if (!form || !name || !card || !prompt) {
      console.error('One or more elements not found!');
      return;
    }
  
    const no = [
      {
        text: "",
        img_src: "https://i.postimg.cc/ZKzKdw6n/cat-01.gif"
      },
      {
        text: "I promise it will be unforgettable",
        img_src: "https://i.postimg.cc/BnMqRskP/cat-02.gif"
      },
      {
        text: "Think about it again",
        img_src: "https://i.postimg.cc/YqN2fQx3/cat-03.gif"
      },
      {
        text: "Come on, dare to say yes",
        img_src: "https://i.postimg.cc/YS0pHZBn/cat-04.gif"
      },
      {
        text: "Don't let fear stop you",
        img_src: "https://i.postimg.cc/kgnJjD1d/cat-05.gif"
      },
    ];
  
    const yes = {
      text: "I knew you'd accept. Love you my sweet pie!",
      img_src: "https://i.postimg.cc/YSPtqRpp/cat-yes.gif"
    };
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validate()) {
        prompt.classList.add('vanish');
        const getData = new FormData(form);
        const data = Object.fromEntries(getData);
        const { name } = data;
        let count = 0;
        card.innerHTML = `
          <h2 class="title"><span>${name}</span>, will you be my valentine?</h2> 
          <div class="img-holder">
            <img src="https://i.postimg.cc/ZKzKdw6n/cat-01.gif" alt="Valentine's Cat">
          </div>
          <div id="statement"></div>
          <div class="answer">
            <button id="yesBtn">Yes</button>
            <button id="noBtn">No</button>
          </div>
        `;
        const yesBtn = document.querySelector('#yesBtn');
        const noBtn = document.querySelector('#noBtn');
        const statement = document.querySelector('#statement');
        const img = document.querySelector('.img-holder img');
        yesBtn.addEventListener('click', () => {
          statement.textContent = yes.text;
          img.src = yes.img_src;
          yesBtn.classList.add('vanish');
          noBtn.classList.add('vanish');
          const defaults = {
          spread: 360,
          ticks: 100,
          gravity: 0,
          decay: 0.94,
          startVelocity: 30,
          shapes: ["heart"],
          colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
        };
  
        confetti({
          ...defaults,
          particleCount: 50,
          scalar: 2,
        });
  
        confetti({
          ...defaults,
          particleCount: 25,
          scalar: 3,
        });
  
        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 4,
        });
        });
        noBtn.addEventListener('click', () => {
          count++;
          if (count < no.length) {
            statement.textContent = no[count].text;
            img.src = no[count].img_src;
          } else if (count === no.length) {
            noBtn.textContent =  "Let's reset";
            yesBtn.classList.add('vanish');
          } else {
            count = 0;
            noBtn.textContent = 'No';
            yesBtn.classList.remove('vanish');
            noBtn.classList.remove('vanish');
            statement.textContent = no[count].text;
            img.src = no[count].img_src;
          }
        });
        form.reset();
      }
    });
  
    function validate() {
      const visitorName = name.value.trim();
      if (!visitorName) {
        name.classList.add('error');
        name.previousElementSibling.classList.add('error');
        name.nextElementSibling.textContent = 'Please add your name!';
        name.nextElementSibling.classList.add('error');
        return false;
      }
      name.classList.remove('error');
      name.previousElementSibling.classList.remove('error');
      name.nextElementSibling.textContent = '';
      name.nextElementSibling.classList.remove('error');
      return true;
    }
  });
