import * as TWEEDLE from "./tweedle.es.min.js";

export const Actions = {
    moveUpDown() {
        return () => {
            this.sprite.y -= 0.1;

            if (this.sprite.x > 10) {
                this.ticker.stop();
            }

            if (this.sprite.y <= 0) {
                this.sprite.y = 5;
            }
        }
    },

    bubble() {
        const originalY = this.sprite.y;
        this.sprite.width = this.sprite.width - (this.sprite.width / 100 * 40); // 50 % decrease
        this.sprite.height = this.sprite.height - (this.sprite.height / 100 * 40); // 50 % decrease
        this.sprite.x = this.sprite.x + 20;
        this.sprite.y = this.sprite.y + 100;
        let isReverse = false;
        return () => {
            if (!isReverse && this.sprite.y > originalY - 100) {
                this.sprite.x -= 1;
                this.sprite.y -= 10;
                this.sprite.width += 1;
                this.sprite.height += 1;
            } else {
                isReverse = true;
            }
            if (isReverse) {
                if (this.sprite.y < originalY - 60) {
                    this.sprite.x += 1;
                    this.sprite.y += 4;
                    this.sprite.width += 1;
                    this.sprite.height += 1;
                } else {
                    this.ticker.stop();
                }
            }
        }
    },

    twDownEasing() {
        const time = 400;
        return new TWEEDLE.Tween(this.sprite).to({alpha: 1, y: 100}, time)
            .easing(TWEEDLE.Easing.Bounce.Out)
            .start();
    },

    twToShowByHalfAlpha() {
        const time = 400;
        return new TWEEDLE.Tween(this.sprite).to({alpha: 0.5}, time)
            .start();
    },

    twToShowByAlpha() {
        const time = 400;
        return new TWEEDLE.Tween(this.sprite).to({alpha: 1}, time)
            .start();
    },

    twPulse() {
        const time = 200;
        return new TWEEDLE.Tween(this.sprite).to({scale: {x: 1.02, y: 1.02}}, time)
            .repeat(Infinity)
            .yoyo(true)
            .start();
    },
}