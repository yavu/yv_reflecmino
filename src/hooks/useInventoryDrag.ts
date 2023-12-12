import { KonvaEventObject } from "konva/lib/Node";
import { useCallback } from "react";

const useInventoryDrag = (width: number) => {
    return useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            e.target.y(338);
            if (width >= 656 || e.target.x() > 0) {
                e.target.x(0);
            }
            else if (e.target.x() < width - 656) {
                e.target.x(width - 656);
            }
        }, [width]
    );
}

export default useInventoryDrag;