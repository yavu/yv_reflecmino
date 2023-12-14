import React from "react";
import { Line } from "react-konva";

type LaserProp = {
    index: number,
    laser_vertex: number[]
};

const Laser = ({ index, laser_vertex }: LaserProp): JSX.Element => {
    return (
        <Line
            points={laser_vertex}
            stroke={index === 0 ? "#0099ff" : "#ff801e"}
            strokeWidth={4}
            lineJoin={'round'}
        />
    );
}

export default React.memo(Laser);
// export default Laser;