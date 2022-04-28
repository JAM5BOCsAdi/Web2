const SPEED = 0.0125;

export default class Paddle{
    constructor(paddleElem){
        this.paddleElem = paddleElem;
        this.reset();
    }
    /** Get's the value of the "--position" [default: from css] */
    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }
    /** Set's the (new) value of the "--position" */
    set position(value){
        this.paddleElem.style.setProperty("--position", value);
    }
    /** Gives back the position of a Paddle */
    rect(){
        return this.paddleElem.getBoundingClientRect();
    }
    /** Resets the position of a Paddle */
    reset(){
        this.position = 50;
    }
    /** Computer's Paddle: It moves the computer paddle up or down, according to the position of the ball */
    update(delta, ballHeight){
        this.position += SPEED * delta * (ballHeight - this.position);
    }
}