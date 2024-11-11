import { Pie, Bar, Line } from "react-chartjs-2";

import {
    Chart,
    ArcElement,
    Tooltip,
    Title,
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
    Title,
    Legend,
    Colors,
    CategoryScale,
    BarElement,
    LinearScale,
    LineElement,
    PointElement
);

export { Pie, Bar, Line };
