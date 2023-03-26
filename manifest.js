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
                    name: 'vase2',
                    srcs: './assets/vase_1.png',
                    pos: [35, -12],
                },
                {
                    name: 'stairs_old',
                    srcs: './assets/stairs.png',
                    pos: [41, 10],
                },
                {
                    name: 'vase1',
                    srcs: './assets/vase_1.png',
                    pos: [-19, -35],
                },

                {
                    name: 'vase3',
                    srcs: './assets/vase_2.png',
                    pos: [45, 30],
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
            name: 'repair-stairs-screen',
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
            name: 'interactive-stairs-screen',
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
            name: 'final-screen',
            assets: [
                {
                    name: 'plug-continue',
                    srcs: './assets/plug_continue.png',
                },
                {
                    name: 'button-continue',
                    srcs: './assets/button_continue.png',
                },
            ],
        },
    ]
};