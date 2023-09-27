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
    const start_point = [
        get_s(flame.indexOf("S")),
        get_s(flame.lastIndexOf("S"))
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
        const move_laser = (start_x: number, start_y: number, start_move: number[]) => {
            let move = start_move;
            for (let x = start_x + move[0], y = start_y + move[1]; board[y - move[1]][x - move[0]] != "E"; x += move[0], y += move[1]) {
                console.log(`${x},${y}`);
                switch (board[y][x]) {
                    case " ":
                        if (random.nextInt(0, 5) == 0) {
                            if (random.nextInt(0, 2) == 0) {
                                board[y][x] = Math.abs(move[0]) == 1 ? "\\" : "/";
                                move = [-move[1], move[0]];
                                console.log("R");
                            }
                            else {
                                board[y][x] = Math.abs(move[0]) == 0 ? "\\" : "/";
                                move = [move[1], -move[0]];
                                console.log("L");
                            }
                        }
                        else {
                            board[y][x] = Math.abs(move[0]) == 0 ? "|" : "-";
                        }
                        break;
                    case "\\":
                        move = Math.abs(move[0]) == 1 ? [-move[1], move[0]] : [move[1], -move[0]];
                        console.log(Math.abs(move[0]) == 1 ? "R" : "L");
                        break;
                    case "/":
                        move = Math.abs(move[0]) == 0 ? [-move[1], move[0]] : [move[1], -move[0]];
                        console.log(Math.abs(move[0]) == 0 ? "R" : "L");
                        break;
                    case "|":
                    case "-":
                        board[y][x] = "+";
                        break;
                    case "#":
                        board[y][x] = "E";
                        break;
                }
            }
        }
        move_laser(start_point[0].x, start_point[0].y, start_point[0].move);
        move_laser(start_point[1].x, start_point[1].y, start_point[1].move);
        return board;
    }
    const board = random_mirror(empty_board);






    console.log(`${board[0].join("")}\n${board[1].join("")}\n${board[2].join("")}\n${board[3].join("")}\n${board[4].join("")}\n${board[5].join("")}\n${board[6].join("")}`);
    console.log(start_point);
}

