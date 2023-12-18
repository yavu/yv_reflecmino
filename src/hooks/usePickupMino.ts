import { KonvaEventObject } from "konva/lib/Node";
import { useCallback } from "react";
import { replace_2d_array } from "../utils/function";
import { PuzzleData } from "../puzzle/const";
import { simulate_laser } from "../puzzle/simulate_laser";

const usePickupMino = (index: number, setPuzzleData: React.Dispatch<React.SetStateAction<PuzzleData>>, setDraggingMinoIndex: React.Dispatch<React.SetStateAction<number | undefined>>) => {
    return useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.cancelBubble = true;
            setDraggingMinoIndex(index);
            setPuzzleData((prev_data) => {
                const picked_mino = prev_data[1][index];
                const new_board = (() => {
                    if (picked_mino.pos) {
                        const place_1 = replace_2d_array([...prev_data[0]], picked_mino.pos.x + picked_mino.cell[0].x, picked_mino.pos.y + picked_mino.cell[0].y, " ");
                        const place_2 = replace_2d_array(place_1, picked_mino.pos.x + picked_mino.cell[1].x, picked_mino.pos.y + picked_mino.cell[1].y, " ");
                        return replace_2d_array(place_2, picked_mino.pos.x + picked_mino.cell[2].x, picked_mino.pos.y + picked_mino.cell[2].y, " ");
                    }
                    else {
                        return prev_data[0];
                    }
                })();
                const new_laser = [
                    simulate_laser(new_board, prev_data[2][0].start),
                    simulate_laser(new_board, prev_data[2][1].start)
                ];

                return [
                    new_board,
                    prev_data[1],
                    [
                        { ...prev_data[2][0], board: new_laser[0][0], vertex: new_laser[0][4] },
                        { ...prev_data[2][1], board: new_laser[1][0], vertex: new_laser[1][4] }
                    ]
                ]
            });
        }, [index, setPuzzleData, setDraggingMinoIndex]
    );
}

export default usePickupMino;