const zmP = document.getElementById('break-decrement');
const zwP = document.getElementById('break-increment');
const zmS = document.getElementById('session-decrement');
const zwS = document.getElementById('session-increment');
const startStop = document.getElementById('start_stop');
const resetujBtn = document.getElementById('reset');
const DlugoscPrzerwy = document.getElementById('break-length');
const wyswietlDlugoscSesji = document.getElementById('session-length');
const etykietaTimera = document.getElementById('timer-label');
const wyswietlCzasPozostaly = document.getElementById('time-left');
const dzwiek = document.getElementById('beep');

let dlPrzerMInutach = 5;
let dlSesjiMIn = 25;
let pozostalyCzasWSekundach = dlSesjiMIn * 60;
let czyTimerDziala = false;
let czySesjaTrwa = true;
let interwal;

const formatujCzas = czasWSekundach => {
  const minuty = Math.floor(czasWSekundach / 60);
  const sekundy = czasWSekundach % 60;
  return `${minuty < 10 ? '0' : ''}${minuty}:${sekundy < 10 ? '0' : ''}${sekundy}`;
};

const aktualizujWyswietlanie = () => {
  DlugoscPrzerwy.textContent = dlPrzerMInutach;
  wyswietlDlugoscSesji.textContent = dlSesjiMIn;
  etykietaTimera.textContent = czySesjaTrwa ? 'Sesja' : 'Przerwa';
  wyswietlCzasPozostaly.textContent = formatujCzas(pozostalyCzasWSekundach);
};

const startujZatrzymujTimer = () => {
  if (czyTimerDziala) {
    clearInterval(interwal);
    czyTimerDziala = false;
  } else {
    interwal = setInterval(() => {
      pozostalyCzasWSekundach--;
      aktualizujWyswietlanie();

      if (pozostalyCzasWSekundach === 0) {
        dzwiek.play();
        clearInterval(interwal);
        if (czySesjaTrwa) {
          czySesjaTrwa = false;
          pozostalyCzasWSekundach = dlPrzerMInutach * 60;
        } else {
          czySesjaTrwa = true;
          pozostalyCzasWSekundach = dlSesjiMIn * 60;
        }
        interwal = setInterval(startujZatrzymujTimer, 1000);
      }
    }, 1000);
    czyTimerDziala = true;
  }
  aktualizujWyswietlanie();
};

const resetujTimer = () => {
  clearInterval(interwal);
  dzwiek.pause();
  dzwiek.currentTime = 0;
  dlPrzerMInutach = 5;
  dlSesjiMIn = 25;
  pozostalyCzasWSekundach = dlSesjiMIn * 60;
  czyTimerDziala = false;
  czySesjaTrwa = true;
  aktualizujWyswietlanie();
};

zmS.addEventListener('click', () => {
  if (dlPrzerMInutach > 1) {
    dlPrzerMInutach--;
    if (!czyTimerDziala && !czySesjaTrwa) {
      pozostalyCzasWSekundach = dlPrzerMInutach * 60;
    }
    aktualizujWyswietlanie();
  }
});

zwS.addEventListener('click', () => {
    if (dlSesjiMIn < 60) {
      dlSesjiMIn++;
      if (!czyTimerDziala && czySesjaTrwa) {
        pozostalyCzasWSekundach = dlSesjiMIn * 60;
      }
      aktualizujWyswietlanie();
    }
});

zwP.addEventListener('click', () => {
  if (dlPrzerMInutach < 60) {
    dlPrzerMInutach++;
    if (!czyTimerDziala && !czySesjaTrwa) {
      pozostalyCzasWSekundach = dlPrzerMInutach * 60;
    }
    aktualizujWyswietlanie();
  }
});

zmP.addEventListener('click', () => {
  if (dlSesjiMIn > 1) {
    dlSesjiMIn--;
    if (!czyTimerDziala && czySesjaTrwa) {
      pozostalyCzasWSekundach = dlSesjiMIn * 60;
    }
    aktualizujWyswietlanie();
  }
});


startStop.addEventListener('click', startujZatrzymujTimer);

resetujBtn.addEventListener('click', resetujTimer);

aktualizujWyswietlanie();
