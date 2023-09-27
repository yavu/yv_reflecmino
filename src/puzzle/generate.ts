import { compose_n } from "../utils/function";
import { Random } from "../utils/random"

export function generate(seed: number) {
    const random = new Random(seed);
    const insert = (base: string, index: number, other: string) => base.slice(0, index) + other + base.slice(index);
    const random_insert = (base: string) => insert(base, random.nextInt(0, base.length + 2), "S");
    const initial = "##################";
    const flame = compose_n(2, random_insert)(initial).split("");

    const get_s = (index: number) => {
        if (index < 5) { return { x: index + 1, y: 0, move: [0, 1] }; }
        else if (index < 10) { return { x: index - 4, y: 6, move: [0, -1] }; }
        else { return { x: index % 2 * 6, y: (index - index % 2) / 2 - 4, move: [index % 2 == 0 ? 1 : -1, 0] }; }
    }
    const mirror_random_count = random.nextInt(3, 7);
    const laser = [
        Object.assign({ mirror: mirror_random_count }, get_s(flame.indexOf("S"))),
        Object.assign({ mirror: 6 - mirror_random_count }, get_s(flame.lastIndexOf("S"))),
    ]

    const empty_board = [
        ["#", ...flame.slice(0, 5), "#"],
        [flame[10], " ", " ", " ", " ", " ", flame[11]],
        [flame[12], " ", " ", " ", " ", " ", flame[13]],
        [flame[14], " ", " ", " ", " ", " ", flame[15]],
        [flame[16], " ", " ", " ", " ", " ", flame[17]],
        [flame[18], " ", " ", " ", " ", " ", flame[19]],
        ["#", ...flame.slice(5, 10), "#"]
    ];

    const random_mirror = (base: string[][]) => {
        const board = base;
        for (let i = 0; i < 2; i++) {
            let move = laser[i].move;
            let mirror = laser[i].mirror;
            let range = 0;
            for (let x = laser[i].x + move[0], y = laser[i].y + move[1]; board[y - move[1]][x - move[0]] !== "E"; x += move[0], y += move[1]) {
                console.log(`${x},${y}`);
                if (x > 1000 || y > 1000 || x < -1000 || y < -1000) {
                    break;
                }
                switch (board[y][x]) {
                    case " ":
                        board[y][x] = Math.abs(move[0]) === 0 ? "|" : "-";
                        break;
                    case "\\":
                        move = Math.abs(move[0]) === 1 ? [-move[1], move[0]] : [move[1], -move[0]];
                        range = 0;
                        console.log(Math.abs(move[0]) === 1 ? "R" : "L");
                        break;
                    case "/":
                        move = Math.abs(move[0]) === 0 ? [-move[1], move[0]] : [move[1], -move[0]];
                        range = 0;
                        console.log(Math.abs(move[0]) === 0 ? "R" : "L");
                        break;
                    case "|":
                    case "-":
                        board[y][x] = "+";
                        break;
                    case "#":
                    case "S":
                        if (mirror > 0) {
                            for (let j = random.nextInt(1, range); j > 0; j--) {
                                x -= move[0];
                                y -= move[1];
                                if (board[y][x] === "+") {
                                    board[y][x] = Math.abs(move[0]) === 0 ? "-" : "|";
                                }
                                else if (board[y][x] !== "#") {
                                    board[y][x] = " ";
                                }
                            }
                            if (board[y][x] !== "|" && board[y][x] !== "-") {
                                if (random.nextInt(0, 2) === 0) {
                                    if (board[y + move[0]][x - move[1]] !== "#") {
                                        board[y][x] = Math.abs(move[0]) === 1 ? "\\" : "/";
                                        move = [-move[1], move[0]];
                                    }
                                    else {
                                        board[y][x] = Math.abs(move[0]) === 0 ? "\\" : "/";
                                        move = [move[1], -move[0]];
                                    }
                                    console.log(`set_R ${x},${y}`);
                                }
                                else {
                                    if (board[y - move[0]][x + move[1]] !== "#") {
                                        board[y][x] = Math.abs(move[0]) === 0 ? "\\" : "/";
                                        move = [move[1], -move[0]];
                                    }
                                    else {
                                        board[y][x] = Math.abs(move[0]) === 1 ? "\\" : "/";
                                        move = [-move[1], move[0]];
                                    }
                                    console.log(`set_L ${x},${y}`);
                                }
                                mirror--;
                            }
                            else {
                                board[y][x] = "+";
                            }
                            range = 0;
                        }
                        else {
                            board[y][x] = "E";
                        }
                        break;
                }
                range++;
            }
        }
        return board;
    }
    const board = random_mirror(empty_board);
    console.log(`${board[0].join("")}\n${board[1].join("")}\n${board[2].join("")}\n${board[3].join("")}\n${board[4].join("")}\n${board[5].join("")}\n${board[6].join("")}`);
    console.log(laser);
}

