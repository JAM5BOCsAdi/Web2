const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000005;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }
    /** Get's the value of the "--x" [default: from css] */
    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }
    /** Set's the (new) value of the "--x" */
    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }
    /** Get's the value of the "--y" [default: from css] */
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }
    /** Set's the (new) value of the "--y" */
    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }
    /** Gives back the position of the Ball */
    rect() {
        return this.ballElem.getBoundingClientRect();
    }
    /** Resets the Ball's position */
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 };
        /** Changing the direction of the ball [not only up and down] */
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = randomNumberBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        //console.log(this.direction);
        this.velocity = INITIAL_VELOCITY;
    }
    /** Updating the Ball's direction and velocity */
    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;
        const rect = this.rect();
        /** If the Ball hits the top or bottom of the screen, it's changing position */
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }
        /** If the Ball hits the left or right side of the screen, it's changing position */
        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1;
        }
    }
}
/** 
 * Random number between min and max 
 * in reset() function
 */
function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}
/** Function that watches when the Ball is collided with the
 *  Top, Bottom, Right or Left of the screen
 *  */
function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    );
}