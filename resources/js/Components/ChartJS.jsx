import { Pie, Bar, Line } from "react-chartjs-2";

import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    Colors,
    CategoryScale,
    BarElement,
    LinearScale,
    LineElement,
    PointElement,
} from "chart.js";

Chart.register(
    ArcElement,
    Tooltip,
    Legend,
    Colors,
    CategoryScale,
    BarElement,
    LinearScale,
    LineElement,
    PointElement
);

export { Pie, Bar, Line };
