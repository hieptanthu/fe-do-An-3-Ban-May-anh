import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import classNames from 'classnames/bind';
import styles from './style.model.scss'; // Assume you have a CSS module for styling

const cx = classNames.bind(styles);

function Main() {
  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <main className={cx('main-container')}>
      <div className={cx('main-title')}>
        <h3>DASHBOARD</h3>
      </div>

      <div className={cx('main-cards')}>
        <div className={cx('card')}>
          <div className={cx('card-inner')}>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className={cx('card_icon')} />
          </div>
          <h1>300</h1>
        </div>
        <div className={cx('card')}>
          <div className={cx('card-inner')}>
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className={cx('card_icon')} />
          </div>
          <h1>12</h1>
        </div>
        <div className={cx('card')}>
          <div className={cx('card-inner')}>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className={cx('card_icon')} />
          </div>
          <h1>33</h1>
        </div>
        <div className={cx('card')}>
          <div className={cx('card-inner')}>
            <h3>ALERTS</h3>
            <BsFillBellFill className={cx('card_icon')} />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className={cx('charts')}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Main;
