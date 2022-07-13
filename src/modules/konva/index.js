import React, { useState, useEffect, useRef } from 'react'
import Draftjs from '../draftjs';
import { Stage, Layer, Rect, Circle, Transformer } from 'react-konva';

export default function Konvajs() {

    const circRef = useRef(null)
    const rectRef = useRef(null)
    const transformRef = useRef(null)

    const rectProps = {
        ref: rectRef,
        width: 50,
        height: 50,
        fill: 'red',
        draggable: true,
        onClick: (e) => {
            transformRef.current.nodes([rectRef.current, circRef.current])
            transformRef.current.getLayer().batchDraw()
        }
    }
    
    const circleProps = {
        ref: circRef,
        x: 200, 
        y:200, 
        stroke: "black",
        radius: 50,
        draggable: true,
        onClick: (e) => {
            transformRef.current.nodes([circRef.current])
            transformRef.current.getLayer().batchDraw()
        }
    }

    return (
        <div>
            <Draftjs />
            <Stage 
                style={{ background: 'aqua' }} 
                width={window.innerWidth} 
                height={window.innerHeight}
            >
                <Layer>
                    <Rect {...rectProps} />
                    <Circle {...circleProps} />
                    <Transformer ref={transformRef} />
                </Layer>
            </Stage>
        </div>
    )
}
