class Sound {
  constructor(urls = []) {
    this.urls = urls;
    this.shouldPlay = true;

    document.addEventListener("mouseover", this.init.bind(this));
    this.startEvt();
  }

  init() {
    if (this.isActive) return;
    this.isActive = true;

    this.ctx = new AudioContext({
      latencyHint: "interactive",
      sampleRate: 44100
    });

    Howler.volume(1.0);

    this.sounds = this.urls.map((item, i) => {
      const s = new Howl({
        src: [item],
        onplayerror: () => console.log("Error Playing the Sound")
      });

      return s;
    });
  }

  startEvt() {
    [...document.querySelectorAll("[data-sound]")].forEach((item) => {
      const { trigger, sound } = item.dataset;
      const index = parseFloat(sound);

      // on hover
      if (trigger === "hover") {
        item.onmouseover = () => this.playSound(index);
      }

      // on click
      if (trigger === "click") {
        item.onclick = () => this.playSound(index);
      }
    });

    // toggle btn
    const toggle = document.querySelector('[data-audio="toggle"]');
    if (toggle) toggle.onclick = () => this.onOff();
  }

  onOff() {
    this.shouldPlay ? (this.shouldPlay = false) : (this.shouldPlay = true);
  }

  playSound(i) {
    if (!this.shouldPlay) return;
    if (!this.ctx) {
      setTimeout(() => this.sounds[i].play(), 10);
    } else this.sounds[i].play();
  }
}
