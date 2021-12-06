export default class LanterFish {
  constructor(timer) {
    this.timer = timer;
  }

  liveADay = () => {
    this.timer--;
    if (this.timer < 0) {
      this.timer = 6;
      return new LanterFish(8);
    }
  };
}
