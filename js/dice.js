class Dice {
  face = 0;

  constructor() {}

  roll() {
    this.face = Math.floor(Math.random() * 6 + 1);
  }

  getImage() {
    return [
      '/assets/images/dice-target.png',
      '/assets/images/dice-six-faces-one.png',
      '/assets/images/dice-six-faces-two.png',
      '/assets/images/dice-six-faces-three.png',
      '/assets/images/dice-six-faces-four.png',
      '/assets/images/dice-six-faces-five.png',
      '/assets/images/dice-six-faces-six.png',
    ][this.face];
  }
}
