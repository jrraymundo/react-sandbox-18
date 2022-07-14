import React, { useState, useEffect, useRef } from 'react'
import Draftjs from '../draftjs';
import { Stage, Layer, Rect, Circle, Transformer, Group } from 'react-konva';
import { Html } from 'react-konva-utils'

export default function Konvajs() {

    const groupRef = useRef(null)
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
            transformRef.current.nodes([rectRef.current])
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
                width={window.innerWidth} 
                height={window.innerHeight}
            >
                <Layer>
                    <Circle {...circleProps} />
                    <Transformer ref={transformRef} />
                    {/* <Group 
                        ref={groupRef}
                        draggable={true}
                        height={400}
                        width={800}
                        onClick={(e) => {
                            transformRef.current.nodes([groupRef.current])
                            transformRef.current.getLayer().batchDraw()
                        }}
                    >
                        <Rect fill='red' width='800' height='400' opacity={0.5} />
                        <Html 
                            divProps={{ style: { zIndex: -1 } }}
                        >
                            <Draftjs />
                        </Html>
                    </Group> */}
                </Layer>
            </Stage>
        </div>
    )
}
