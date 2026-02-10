
document.addEventListener("DOMContentLoaded", () => {

  const phoneInput = document.querySelectorAll('input[name="phone"]');

  if(phoneInput.length > 0) {
    phoneInput.forEach(item => {
      IMask(item, {
        mask: '+{7} (000) 000-00-00'
      });
    });
  }

  class CountdownTimer {
    constructor(elementId, options = {}) {
      this.element = document.querySelector(elementId);
      if(!this.element) return;
      this.cookieName = options.cookieName || 'countdown_timer';
      this.onComplete = options.onComplete || function() {};
      this.initialTime = this.element.getAttribute('data-countdown');
      this.buildMarkup();
      this.initialize();
    }

    buildMarkup() {
      const markup = `
        <div class="countdown__inner">
          <div class="countdown__item">
            <div class="countdown__number"></div>
            <div class="countdown__number"></div>
          </div>
          <div class="countdown__dots">:</div>
          <div class="countdown__item">
            <div class="countdown__number"></div>
            <div class="countdown__number"></div>
          </div>
          <div class="countdown__dots">:</div>
          <div class="countdown__item">
            <div class="countdown__number"></div>
            <div class="countdown__number"></div>
          </div>
        </div>`;
      this.element.insertAdjacentHTML('beforeend', markup);
      this.digits = this.element.querySelectorAll('.countdown__number');
    }
            
    initialize() {
      const savedTime = this.getCookie(this.cookieName);
      let startTime;
      if (savedTime) {
        startTime = savedTime;
      } else {
        startTime = this.initialTime;
        this.setCookie(this.cookieName, this.initialTime, 1);
      }
      const [hours, minutes, seconds] = startTime.split(':').map(Number);
      this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
      if (this.totalSeconds <= 0) {
        this.restartTimer();
        return;
      }
      this.start();
    }

    start() {
      this.updateDisplay();
      this.interval = setInterval(() => {
        this.totalSeconds--;
        if (this.totalSeconds <= 0) {
          this.stop();
          this.deleteCookie(this.cookieName);
          this.onComplete();
          this.restartTimer();
          return;
        }
        this.updateDisplay();
        this.saveCurrentTime();
      }, 1000);
    }

    restartTimer() {
      this.stop();
      const [hours, minutes, seconds] = this.initialTime.split(':').map(Number);
      this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
      this.setCookie(this.cookieName, this.initialTime, 1);
      this.start();
    }
            
    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
            
    updateDisplay() {
      const hours = Math.floor(this.totalSeconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((this.totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const seconds = (this.totalSeconds % 60).toString().padStart(2, '0');

      this.digits[0].textContent = hours[0];
      this.digits[1].textContent = hours[1];
      this.digits[2].textContent = minutes[0];
      this.digits[3].textContent = minutes[1];
      this.digits[4].textContent = seconds[0];
      this.digits[5].textContent = seconds[1];
    }

    saveCurrentTime() {
      const hours = Math.floor(this.totalSeconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((this.totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const seconds = (this.totalSeconds % 60).toString().padStart(2, '0');
      this.setCookie(this.cookieName, `${hours}:${minutes}:${seconds}`, 1);
    }
            
    setCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    getCookie(name) {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
      }
      return null;
    }
            
    deleteCookie(name) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
            
    reset() {
      this.restartTimer();
    }
  }

  const timer = new CountdownTimer('.countdown', {
    cookieName: 'my_timer',
    onComplete: function() {
      console.log('Таймер завершён, перезапуск...');
    }
  });
});