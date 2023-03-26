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
                this.sprite.x -= 0.6;
                this.sprite.y -= 5.5;
                this.sprite.width += 0.7;
                this.sprite.height += 0.7;
            } else {
                isReverse = true;
            }
            if (isReverse) {
                if (this.sprite.y < originalY - 60) {
                    this.sprite.x += 0.5;
                    this.sprite.y += 2.8;
                    this.sprite.width += 1;
                    this.sprite.height += 1;
                } else {
                    this.ticker.stop();
                }
            }
        }
    }
}