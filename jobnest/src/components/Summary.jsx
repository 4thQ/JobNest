import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Paper, Typography, Grid } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

function Summary() {
  const [stats, setStats] = useState({
    statusCount: [],
    monthlyApplications: [],
  });

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    // Calculate status counts
    const statusCount = Object.entries(
      jobs.reduce((acc, job) => {
        acc[job.status] = (acc[job.status] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));

    // Calculate monthly applications
    const monthlyApplications = Object.entries(
      jobs.reduce((acc, job) => {
        const month = new Date(job.appliedDate).toLocaleString("default", {
          month: "short",
        });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));

    setStats({
      statusCount,
      monthlyApplications,
    });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Application Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Applications by Status
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={stats.statusCount}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.statusCount.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Applications
            </Typography>
            <BarChart
              width={400}
              height={300}
              data={stats.monthlyApplications}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Applications" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Summary;
