import { Pie, Bar, Line } from "react-chartjs-2";

import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    Colors,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";

Chart.register(
    ArcElement,
    Tooltip,
    Legend,
    Colors,
    CategoryScale,
    LinearScale,
    BarElement
);

export { Pie, Bar, Line };
