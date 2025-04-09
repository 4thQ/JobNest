import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccessTime as AccessTimeIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    interviews: 0,
    offers: 0,
    responseRate: 0,
  });
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

    // Calculate statistics
    const total = jobs.length;
    const active = jobs.filter((job) =>
      ["Applied", "Interview"].includes(job.status)
    ).length;
    const interviews = jobs.filter((job) => job.status === "Interview").length;
    const offers = jobs.filter((job) => job.status === "Offer").length;
    const responses = jobs.filter((job) =>
      ["Interview", "Offer", "Rejected"].includes(job.status)
    ).length;
    const responseRate = total > 0 ? (responses / total) * 100 : 0;

    setStats({
      total,
      active,
      interviews,
      offers,
      responseRate,
    });

    // Get recent jobs
    const recent = [...jobs]
      .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
      .slice(0, 5);
    setRecentJobs(recent);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      Applied: "info",
      Interview: "warning",
      Offer: "success",
      Rejected: "error",
      Accepted: "success",
    };
    return colors[status] || "default";
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}.lighter`,
              borderRadius: "12px",
              p: 1,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-job")}
          sx={{ px: 3 }}
        >
          Add New Application
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Applications"
            value={stats.total}
            icon={<BusinessIcon sx={{ color: "primary.main" }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Applications"
            value={stats.active}
            icon={<AccessTimeIcon sx={{ color: "warning.main" }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Interviews"
            value={stats.interviews}
            icon={<TrendingUpIcon sx={{ color: "success.main" }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Offers"
            value={stats.offers}
            icon={<TrendingUpIcon sx={{ color: "secondary.main" }} />}
            color="secondary"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Applications
            </Typography>
            <List>
              {recentJobs.map((job) => (
                <ListItem
                  key={job.id}
                  divider
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                  onClick={() => navigate("/jobs")}
                >
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {job.position}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {job.company} • Applied{" "}
                        {new Date(job.appliedDate).toLocaleDateString()}
                      </Typography>
                    }
                  />
                  <Chip
                    label={job.status}
                    color={getStatusColor(job.status)}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
