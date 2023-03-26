import {Ticker} from "./pixi.min.mjs";

export const Actions = {
    shaking(){
        if( this.ticker ){
            this.ticker.stop();

            this.ticker.destroy();
            this.ticker = null;
        }

        this.ticker = Ticker.shared;
        this.ticker.speed = 0.001;
        console.log(this.ticker)
        const move = () => {
            this.sprite.y -= 0.1;

            if (this.sprite.x > 10) {
                this.ticker.stop();
            }

            if (this.sprite.y <= 0) {
                this.sprite.y = 5;
            }
        }

        this.ticker.add(move.bind(this));

        this.ticker.remove(move);

    }


}