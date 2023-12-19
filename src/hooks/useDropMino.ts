import { KonvaEventObject } from "konva/lib/Node";
import { useCallback } from "react";
import { replace_2d_array } from "../utils/function";
import { PuzzleData } from "../puzzle/const";
import { simulate_laser } from "../puzzle/simulate_laser";

const useDropMino = (index: number, setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>, setDraggingMinoIndex: React.Dispatch<React.SetStateAction<number | undefined>>, update_pos: { x: number, y: number } | undefined, update_scale: { x: number, y: number } | undefined) => {
    return useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.cancelBubble = true;
            setDraggingMinoIndex(undefined);
            setPuzzleData((prev_data) => {
                const mino_pos = {
                    x: Math.round((e.target.x() + 25) / 50),
                    y: Math.round((e.target.y() + 25) / 50)
                };
                // console.log(`pos    | ${e.target.x()} : ${e.target.y()}`);
                // console.log(`offset | ${offset.x} : ${offset.y}`);
                // console.log(`mino p | ${Math.round((e.target.x() + drop_offset_x + 25) / 50)} : ${Math.round((e.target.y() + 25) / 50)}`);
                const picked_mino = prev_data[1][index];
                const cell_pos = [
                    { x: mino_pos.x + picked_mino.cell[0].x, y: mino_pos.y + picked_mino.cell[0].y },
                    { x: mino_pos.x + picked_mino.cell[1].x, y: mino_pos.y + picked_mino.cell[1].y },
                    { x: mino_pos.x + picked_mino.cell[2].x, y: mino_pos.y + picked_mino.cell[2].y }
                ];
                const on_board = (
                    0 < cell_pos[0].x && cell_pos[0].x < 6 && 0 < cell_pos[0].y && cell_pos[0].y < 6 &&
                    0 < cell_pos[1].x && cell_pos[1].x < 6 && 0 < cell_pos[1].y && cell_pos[1].y < 6 &&
                    0 < cell_pos[2].x && cell_pos[2].x < 6 && 0 < cell_pos[2].y && cell_pos[2].y < 6
                );
                const placeable = on_board
                    ? (
                        prev_data[0][cell_pos[0].y][cell_pos[0].x] === " " &&
                        prev_data[0][cell_pos[1].y][cell_pos[1].x] === " " &&
                        prev_data[0][cell_pos[2].y][cell_pos[2].x] === " "
                    )
                    : false;
                const new_board = (() => {
                    if (placeable) {
                        const place_1 = replace_2d_array([...prev_data[0]], mino_pos.x + picked_mino.cell[0].x, mino_pos.y + picked_mino.cell[0].y, picked_mino.cell[0].type);
                        const place_2 = replace_2d_array(place_1, mino_pos.x + picked_mino.cell[1].x, mino_pos.y + picked_mino.cell[1].y, picked_mino.cell[1].type);
                        return replace_2d_array(place_2, mino_pos.x + picked_mino.cell[2].x, mino_pos.y + picked_mino.cell[2].y, picked_mino.cell[2].type);
                    }
                    else {
                        return structuredClone(prev_data[0]);
                    }
                })();
                const new_laser = [
                    simulate_laser(new_board, prev_data[2][0].start),
                    simulate_laser(new_board, prev_data[2][1].start)
                ];

                return [
                    new_board,
                    [
                        ...prev_data[1].slice(0, index),
                        {
                            ...prev_data[1][index],
                            pos: placeable
                                ? mino_pos
                                : undefined
                        },
                        ...prev_data[1].slice(index + 1)
                    ],
                    [
                        { ...prev_data[2][0], board: new_laser[0][0], vertex: new_laser[0][4] },
                        { ...prev_data[2][1], board: new_laser[1][0], vertex: new_laser[1][4] }
                    ]
                ]
            });
            if (update_pos) {
                e.target.position(update_pos);
            }
            if (update_scale) {
                e.target.scale(update_scale);
            }
        }, [index, setPuzzleData, setDraggingMinoIndex, update_pos, update_scale]
    );
}

export default useDropMino;