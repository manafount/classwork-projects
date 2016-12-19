class Clock {
  constructor() {
    let currentDate = new Date();
    this.hours = currentDate.getHours();
    this.minutes = currentDate.getMinutes();
    this.seconds = currentDate.getSeconds();

    this.printTime();

    setInterval( () => this._tick(), 1000);
  }

  printTime() {
    let hours = `0${this.hours}`,
        minutes = `0${this.minutes}`,
        seconds = `0${this.seconds}`;

    console.log(hours.slice(-2) + ":" + minutes.slice(-2) + ":" + seconds.slice(-2));
  }

  _tick() {
    this.seconds++;
    if (this.seconds === 60) {
      this.minutes++;
      this.seconds = 0;
    }

    if (this.minutes === 60) {
      this.hours++;
      this.minutes = 0;
    }

    if (this.hours === 24) {
      this.hours = 0;
    }

    this.printTime();
  }
}

let clock = new Clock();
