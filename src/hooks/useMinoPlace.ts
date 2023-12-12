import { KonvaEventObject } from "konva/lib/Node";
import { useCallback } from "react";
import { replace_2d_array } from "../utils/function";
import { Laser, PuzzleData, empty_board } from "../puzzle/const";
import { simulate_laser } from "../puzzle/simulate_laser";

const useMinoPlace = (mino_pos: { x: number; y: number; } | undefined, cell_data: { x: number; y: number; type: string; }[], index: number, laser_data: Laser[], offset: { x: number, y: number }, setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>) => {
    return useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.cancelBubble = true;
            const pos = {
                x: Math.round((e.target.x() + offset.x + 25) / 50),
                y: Math.round((e.target.y() + offset.y + 25) / 50)
            };
            const cell_pos = [
                { x: pos.x + cell_data[0].x, y: pos.y + cell_data[0].y },
                { x: pos.x + cell_data[1].x, y: pos.y + cell_data[1].y },
                { x: pos.x + cell_data[2].x, y: pos.y + cell_data[2].y }
            ];
            const on_board = (
                0 < cell_pos[0].x && cell_pos[0].x < 6 && 0 < cell_pos[0].y && cell_pos[0].y < 6 &&
                0 < cell_pos[1].x && cell_pos[1].x < 6 && 0 < cell_pos[1].y && cell_pos[1].y < 6 &&
                0 < cell_pos[2].x && cell_pos[2].x < 6 && 0 < cell_pos[2].y && cell_pos[2].y < 6
            );
            function place_mino(board: string[][], i: number) {
                if (mino_pos) {
                    const place_1 = replace_2d_array(board, mino_pos.x + cell_data[0].x, mino_pos.y + cell_data[0].y, cell_data[0].type);
                    const place_2 = replace_2d_array(place_1, mino_pos.x + cell_data[1].x, mino_pos.y + cell_data[1].y, cell_data[1].type);
                    return replace_2d_array(place_2, mino_pos.x + cell_data[2].x, mino_pos.y + cell_data[2].y, cell_data[2].type);
                }
                else {
                    return board;
                }
            }
            const place_0 = index !== 0
                ? place_mino(empty_board, 0)
                : empty_board;
            const place_1 = index !== 1
                ? place_mino(place_0, 1)
                : place_0;
            const place_2 = index !== 2
                ? place_mino(place_1, 2)
                : place_1;
            const place_3 = index !== 3
                ? place_mino(place_2, 3)
                : place_2;

            const placeable = on_board
                ? (
                    place_3[cell_pos[0].y][cell_pos[0].x] === " " &&
                    place_3[cell_pos[1].y][cell_pos[1].x] === " " &&
                    place_3[cell_pos[2].y][cell_pos[2].x] === " "
                )
                : false;
            const new_board = (() => {
                if (placeable) {
                    const place_1 = replace_2d_array(place_3, cell_pos[0].x, cell_pos[0].y, cell_data[0].type);
                    const place_2 = replace_2d_array(place_1, cell_pos[1].x, cell_pos[1].y, cell_data[1].type);
                    return replace_2d_array(place_2, cell_pos[2].x, cell_pos[2].y, cell_data[2].type);
                }
                else {
                    return place_3;
                }
            })();
            const new_pos = placeable
                ? pos
                : undefined;
            const new_laser = [
                simulate_laser(new_board, laser_data[0].start),
                simulate_laser(new_board, laser_data[1].start)
            ]
            setPuzzleData((prev_data) => [
                new_board,
                [
                    ...prev_data[1].slice(0, index),
                    {
                        ...prev_data[1][index],
                        pos: new_pos
                    },
                    ...prev_data[1].slice(index + 1)
                ],
                [
                    { ...prev_data[2][0], board: new_laser[0][0], vertex: new_laser[0][4] },
                    { ...prev_data[2][1], board: new_laser[1][0], vertex: new_laser[1][4] }
                ]
            ]);
            console.log([...new_board].map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));

            console.log(simulate_laser(new_board, laser_data[0].start)[0].map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));
            console.log(simulate_laser(new_board, laser_data[1].start)[0].map(y => y.map(x => x.length === 1 ? ` ${x}` : x)).join("\n").replace(/,/g, " "));

        }, [mino_pos, cell_data, index, laser_data, offset, setPuzzleData]
    );
}

export default useMinoPlace;