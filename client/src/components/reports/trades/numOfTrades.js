import React, { PureComponent, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import '../layout/style.scss'

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const label=[
    {key:"uv",color:"#558EFA",stopColor:"#558EFA"},
    {key:"pv",color:"#FFAA004D",stopColor:"#FFAA000D"},
    {key:"amt",color:"#26A17B",stopColor:"#FFFFFF"}
]

const NumOfTrades = () => {
    const [barProps, setBarProps] = useState(
        label.reduce(
            (a, { key }) => {
                a[key] = false;
                return a;
            },
            { hover: null }
            )
            );
            // const handleLegendMouseEnter = (e) => {
            //     if (!barProps[e.dataKey]) {
            //         setBarProps({ ...barProps, hover: e.dataKey });
            //     }
            // };
            
            // const handleLegendMouseLeave = (e) => {
            //     setBarProps({ ...barProps, hover: null });
            // };
            
            const selectBar = (e) => {
                console.log("element",e)
                setBarProps({
                    ...barProps,
                    [e.dataKey]: !barProps[e.dataKey],
                    hover: null
                });
            };
            const renderLegend = (props) => {
                const { payload } = props;
                // console.log("payload",payload)
                
                return (
                    <div className='d-flex legendContainer'>
                    {
                        payload.map((entry, index) => (
                            <div className='legendItem'>
                            <div className='dot mx-auto' style={{backgroundColor:`${entry.color}`}} ></div>
                            <div key={`item-${index}`}>{entry.value}</div>
                            <span 
                            onClick={() => selectBar(entry)} 
                            // onMouseOver={() => handleLegendMouseEnter(entry)}
                            // onMouseOut={() => handleLegendMouseLeave(entry)}
                            >x</span>
                        </div>
                      ))
                    }
                  </div>
                );
              }
            return (
                <ResponsiveContainer width={1030} height="80%">
                <AreaChart height={250} data={data}
                    margin={{ top: 60, right: 10, left:0, bottom: 0 }}>
                <Legend align="right" verticalAlign="top" height={30} iconType="circle" content={renderLegend}/>
                    <defs>
                        {label.map((label,index) => (
                        <linearGradient id={label.key} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={label.color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={label.stopColor} stopOpacity={0} />
                        </linearGradient>
                        ))}
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis orientation="left" mirror={false} tickMargin={30}/>
                    <CartesianGrid strokeDasharray="2 2" vertical={false} horizontal={true} />
                    <Tooltip/>
                    {label.map((label,index) => (
                        <Area type="monotone" dataKey={label.key} hide={barProps[label.key] === true} stroke={label.color} fillOpacity={1} fill={`url(#${label.key})`} />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        );
    
}

export default NumOfTrades;