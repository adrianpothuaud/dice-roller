class Dice {
  face = undefined;

  constructor() {}

  roll() {
    this.face = Math.floor(Math.random() * 6 + 1);
  }

  getImage() {
    return [
      '/assets/dice-six-faces-one.png',
      '/assets/dice-six-faces-two.png',
      '/assets/dice-six-faces-three.png',
      '/assets/dice-six-faces-four.png',
      '/assets/dice-six-faces-five.png',
      '/assets/dice-six-faces-six.png',
    ][this.face - 1];
  }
}
