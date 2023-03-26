import * as PIXI from "./pixi.min.mjs";
import {Actions} from "./actions.js";

export class BaseContainer extends PIXI.Container {
    constructor(assetsData) {
        super();
        this.view = new PIXI.Container();
        this.sprite = PIXI.Sprite.from(assetsData.name);
        // set default position in to center
        this.setScaleByCurrentScaleWin();
        this.create(assetsData.options);
        this.firstAction(assetsData?.options?.firstAction);
        this.sprite.eventMode = 'static';
        this.sprite.buttonMode = true;
        this.sprite.on('pointerdown', this.onClick.bind(this));
    }

    create(options) {
        if (options && options.waiting) {
            setTimeout(() => {
                this.view.addChild(this.sprite);
            }, options.waiting * 1000);
        } else {
            this.view.addChild(this.sprite);
        }
    }

    setPosition(x = 0, y = 0) {
        x = x - this.sprite.width / 2;
        y = y - this.sprite.height / 2;
        this.view.position.set(x, y);
    }

    setScaleByCurrentScaleWin() {
        this.sprite.scale.x *= window.innerWidth / window.screen.availWidth;
        this.sprite.scale.y *= window.innerHeight / window.screen.availHeight + 0.15;
    }

    firstAction(funcName) {
        if (funcName && Actions[funcName]) {
            Actions[funcName].apply(this);
        }
    }

    onClick() {



    }
}
