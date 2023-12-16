import React from "react";
import { Group, Line } from "react-konva";
import { LaserData } from "../puzzle/const";

type LaserProp = {
    index: number,
    laser_data: LaserData[]
};

const Laser = ({ index, laser_data }: LaserProp): JSX.Element => {
    const color = index === 0 ? "#0099ff" : "#ff801e";
    const same = `${laser_data[0].board}` === `${laser_data[1].board}`;
    return (
        <>
            <Group
                clipX={-2}
                clipY={-2}
                clipWidth={254}
                clipHeight={254}
            >
                <Line
                    points={laser_data[index].vertex}
                    stroke={same ? "#dddddd" : color}
                    strokeWidth={8}
                    lineJoin={"bevel"}
                />
                <Line
                    points={laser_data[index].vertex}
                    stroke={"#ffffff"}
                    strokeWidth={3}
                    lineJoin={"round"}
                />
            </Group>
        </>
    );
}

export default React.memo(Laser);
// export default Laser;