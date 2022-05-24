import randomColor from 'randomcolor';
import React, { createRef, useEffect, useRef, useState } from 'react';
import './Graph.styles.css';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

const Graph = ({ entries }) => {
    const containerRef = useRef();
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(containerRef.current.offsetWidth);
        window.addEventListener('resize', () => {
            setWidth(containerRef.current.offsetWidth);
        })
    }, [])
    console.log(width)

    const COLORS = entries.map(item => {
        return randomColor({
            luminosity: 'dark',
            format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
         });
    })

    return (
        <div ref={containerRef} className='graph-container'>
            <div className='graph-element'>
                <PieChart width={(width/2) - 50} height={350}>
                    <Pie style={{marginBottom:'10px'}} data={entries} color="#000000" dataKey="Estimations" nameKey="name" cx="50%" cy="50%" outerRadius={120} >
                        {
                            entries.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)
                        }

                    </Pie>
                    <Tooltip />
                    <Legend align='left' margin={{top: 20}} />
                </PieChart>
            </div>

            <div className='graph-element'>
                <BarChart width={(width/2) - 50} height={350} data={entries} >
                    <Bar type="monotone" stackId="a" dataKey="Estimations" stroke="#cccccc" fill="#6e8dff">
                        {
                            entries.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Bar>
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <XAxis dataKey="name" />
                    <YAxis />
                </BarChart>
            </div>
        </div>
    )
}

export default Graph