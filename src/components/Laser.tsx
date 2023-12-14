import React from "react";
import { Group, Line } from "react-konva";

type LaserProp = {
    index: number,
    laser_vertex: number[]
};

const Laser = ({ index, laser_vertex }: LaserProp): JSX.Element => {
    return (
        <>
            <Group
                clipX={-10}
                clipY={-10}
                clipWidth={270}
                clipHeight={270}
            >
                <Line
                    points={laser_vertex}
                    stroke={index === 0 ? "#0099ff" : "#ff801e"}
                    strokeWidth={8}
                    lineJoin={"bevel"}
                />
            </Group>
            <Group
                clipX={-16}
                clipY={-16}
                clipWidth={282}
                clipHeight={282}
            >
                <Line
                    points={laser_vertex}
                    // stroke={index === 0 ? "#14b3ff" : "#fe9f56"}
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