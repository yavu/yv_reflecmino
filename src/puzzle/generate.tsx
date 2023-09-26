import { Random } from "../util/random"
const random = new Random(1);

export function generate() {
    let data = {
        start: [0, 0, 0, 0],
        end: [0, 0, 0, 0],
        board: [
            ["-", "#", "#", "#", "#", "#", "-"],
            ["#", "0", "0", "0", "0", "0", "#"],
            ["#", "0", "0", "0", "0", "0", "#"],
            ["#", "0", "0", "0", "0", "0", "#"],
            ["#", "0", "0", "0", "0", "0", "#"],
            ["#", "0", "0", "0", "0", "0", "#"],
            ["-", "#", "#", "#", "#", "#", "-"]
        ]
    };
    data.start[random.nextInt(0, 4)]++;
    data.start[random.nextInt(0, 4)]++;
    data.end[random.nextInt(0, 4)]++;
    data.end[random.nextInt(0, 4)]++;
/*
    for (let i = 0, v = true; i < 4; i++, v = !v) {
        let temp = new Array(5 - data.start[i]).fill("#");
        for (let j = data.start[i]; j > 0; j--) {
            temp.splice(random.nextInt(0, temp.length + 2), 0, "S");
        }
        if (v) {

        }
        else {
        }
    }
*/



    //console.log(temp);

}