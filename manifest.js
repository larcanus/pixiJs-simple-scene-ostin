export const manifest = {
    bundles: [
        {
            name: 'back-screen',
            assets: [
                {
                    name: 'background',
                    srcs: './assets/floor.png',
                    pos: [0, 0],
                },
            ],
        },
        {
            name: 'furniture-screen',
            assets: [
                {
                    name: 'logo',
                    srcs: './assets/logo.png',
                    pos: [-38, -40],
                },
                {
                    name: 'vase2',
                    srcs: './assets/vase_1.png',
                    pos: [35, -12],
                },
                {
                    name: 'stairs',
                    srcs: './assets/stairs.png',
                    pos: [35, 10],
                },
                {
                    name: 'vase1',
                    srcs: './assets/vase_1.png',
                    pos: [-19, -35],
                },

                {
                    name: 'vase3',
                    srcs: './assets/vase_2.png',
                    pos: [45, 34],
                },
                {
                    name: 'stand',
                    srcs: './assets/book_stand.png',
                    pos: [18, -32],
                },
                {
                    name: 'globe',
                    srcs: './assets/globe.png',
                    pos: [-39, -15],
                },
                {
                    name: 'sofa',
                    srcs: './assets/sofa.png',
                    pos: [-28, 25],
                },
                {
                    name: 'table',
                    srcs: './assets/table.png',
                    pos: [-23, 0],
                },
                {
                    name: 'ostin',
                    srcs: './assets/ostin.png',
                    pos: [3, -8],
                },
            ],
        },
        {
            name: 'repair-stairs',
            assets: [
                {
                    name: 'button-repair',
                    srcs: './assets/button_repair.png',
                    pos: [30, 5],                       // pox[0] - percents by x, pox[1] - percents by y,
                    options: {
                        waiting: 2,                     // waiting is time of show sprite
                        firstAction: 'moveUpDown'       // func after spawn
                    }
                },
            ]
        },
        {
            name: 'circle-stairs',
            assets: [
                {
                    name: 'circle-blue-stairs',
                    srcs: './assets/circle_blue_stairs.png',
                    pos: [16, 0],
                    options: {
                        alpha: 1,
                        // scale: 0.5,
                        firstAction: 'bubble'
                    }
                },
                {
                    name: 'circle-gold-stairs',
                    srcs: './assets/circle_gold_stairs.png',
                    pos: [25, -15],
                    options: {
                        alpha: 1,
                        // scale: 0.5,
                        firstAction: 'bubble'
                    }
                },
                {
                    name: 'circle-green-stairs',
                    srcs: './assets/circle_green_stairs.png',
                    pos: [36, -20],
                    options: {
                        alpha: 1,
                        // scale: 0.5,
                        firstAction: 'bubble'
                    }
                },
            ],
        },
        {
            name: 'change-stairs',
            assets: [
                {
                    name: 'change-stairs-blue',
                    srcs: './assets/stairs_blue.png',
                    options: {
                        alpha: 0,
                        firstAction: 'twDownEasing'
                    }

                },
                {
                    name: 'change-stairs-green',
                    srcs: './assets/stairs_green.png',
                    options: {
                        alpha: 0,
                        firstAction: 'twDownEasing'
                    }

                },
                {
                    name: 'change-stairs-gold',
                    srcs: './assets/stairs_gold.png',
                    options: {
                        alpha: 0,
                        firstAction: 'twDownEasing'
                    }

                },
                {
                    name: 'change-circle-gold',
                    srcs: './assets/choose_gold.png',
                },
                {
                    name: 'change-circle-blue',
                    srcs: './assets/choose_blue.png',
                },
                {
                    name: 'change-circle-green',
                    srcs: './assets/choose_green.png',

                },
                {
                    name: 'change-button-ok',
                    srcs: './assets/button_ok.png',
                },

            ],
        },
        {
            name: 'final-screen',
            assets: [
                {
                    name: 'back',
                    srcs: './assets/back.png',
                    options: {
                        alpha: 0,
                        firstAction: 'twToShowByHalfAlpha'
                    },
                    pos: [0, 0],
                },
                {
                    name: 'plug-continue',
                    srcs: './assets/plug_continue.png',
                    pos: [0, -15],
                    options: {
                        alpha: 0,
                        firstAction: 'twToShowByAlpha'
                    },
                },
                {
                    name: 'button-continue',
                    srcs: './assets/button_continue.png',
                    pos: [0, 30],
                    options: {
                        alpha: 0,
                        firstAction: 'twToShowByAlpha'
                    },
                },
            ],
        },
    ]
};