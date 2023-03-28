import * as PIXI from "./pixi.min.mjs";
import {Actions} from "./actions.js";

export class BaseContainer extends PIXI.Container {
    /**
     * @type {Object<string,function>}
     */
    actions = {};

    /**
     * @param {Object} assetsData
     * @param {string} assetsData.name
     * @param {Object} [assetsData.options]
     */
    constructor(assetsData) {
        super();
        this.eventMode = 'static';
        this.ticker = new PIXI.Ticker();

        this.sprite = PIXI.Sprite.from(assetsData.name);
        this.sprite.eventMode = 'static';
        this.sprite.buttonMode = true;

        // this.setScaleByCurrentScaleWin(); // TODO need?
        this.create(assetsData.options);
        this.firstAction(assetsData?.options?.firstAction);
    }

    /**
     * @param {Object} options
     * @param {number} [options.alpha]
     * @param {number} [options.scale]
     * @param {string} [options.waiting]
     */
    create(options) {
        this.sprite.alpha = options?.alpha ?? 1;
        if (options?.scale) {
            this.sprite.scale.x = options.scale;
            this.sprite.scale.y = options.scale;
        }
        if (options?.waiting) {
            setTimeout(() => {
                this.addChild(this.sprite);
            }, options.waiting * 1000);
        } else {
            this.addChild(this.sprite);
        }
    }

    /**
     * @param {number} x=0
     * @param {number} y=0
     */
    setPosition(x = 0, y = 0) {
        x = x - this.sprite.width / 2;
        y = y - this.sprite.height / 2;
        this.position.set(x, y);
    }

    setScaleByCurrentScaleWin() {
        this.sprite.scale.x *= window.innerWidth / window.screen.availWidth;
        this.sprite.scale.y *= window.innerHeight / window.screen.availHeight;
    }

    /**
     * @param {string} funcName
     */
    firstAction(funcName) {
        if (funcName && Actions[funcName]) {
            this.actions[funcName] = Actions[funcName].apply(this);
            if (!funcName.startsWith('tw')) {
                this.ticker.add(this.actions[funcName]);
                this.ticker.start();
            }
        }
    }

    onclick() {
    }
}
