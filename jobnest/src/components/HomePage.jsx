import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";

const BenefitItem = ({ icon, title, description }) => (
  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
    <Box sx={{ color: "primary.main", mt: 0.5 }}>{icon}</Box>
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Box>
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          py: { xs: 6, md: 10 },
          mb: { xs: 6, md: 10 },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12}>
              <Stack spacing={4}>
                <Typography
                  component="h1"
                  variant="h2"
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  JobNest
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ lineHeight: 1.5 }}
                >
                  Your professional job tracking companion. Organize, monitor,
                  and manage your job applications all in one place.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/add-job")}
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ py: 1.5 }}
                  >
                    Add New Job
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/jobs")}
                    startIcon={<WorkIcon />}
                    sx={{ py: 1.5 }}
                  >
                    View Jobs
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 10 } }}>
        <Stack spacing={6}>
          <Box textAlign="center">
            <Typography
              component="h2"
              variant="h3"
              color="primary"
              sx={{
                fontWeight: 700,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: "4px",
                  backgroundColor: "primary.main",
                  borderRadius: "2px",
                },
              }}
            >
              Why Choose JobNest?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mt: 4,
                maxWidth: "800px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Your all-in-one solution for managing job applications efficiently
              and professionally
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <BenefitItem
                icon={<CheckCircleOutlineIcon />}
                title="Smart Application Tracking"
                description="Keep all your job applications organized with our intuitive tracking system. Monitor status, deadlines, and follow-ups in real-time with smart notifications."
              />
              <BenefitItem
                icon={<SpeedIcon />}
                title="Time-Saving Automation"
                description="Automate repetitive tasks and get reminders for important follow-ups. Our platform helps you focus on what matters - preparing for interviews and landing your dream job."
              />
              <BenefitItem
                icon={<SecurityIcon />}
                title="Secure & Private Platform"
                description="Your job search data is encrypted and protected. Access your information securely from any device, with regular backups and privacy controls."
              />
              <BenefitItem
                icon={<AssessmentIcon />}
                title="Data-Driven Insights"
                description="Gain valuable insights into your job search performance. Track success rates, identify patterns, and optimize your application strategy with detailed analytics."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 4,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, mb: 3, color: "primary.main" }}
                  >
                    Everything You Need
                  </Typography>
                  <Stack spacing={2}>
                    <Typography variant="body1" color="text.secondary">
                      JobNest is designed to make your job search process more
                      efficient and less stressful. Our platform helps you stay
                      organized and focused on what matters most - landing your
                      dream job.
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        mt: 2,
                      }}
                    >
                      <CheckCircleOutlineIcon
                        color="primary"
                        sx={{ mt: 0.5 }}
                      />
                      <Typography variant="body1" color="text.secondary">
                        <strong>Centralized Management:</strong> Keep all your
                        applications, documents, and communications in one place
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                    >
                      <CheckCircleOutlineIcon
                        color="primary"
                        sx={{ mt: 0.5 }}
                      />
                      <Typography variant="body1" color="text.secondary">
                        <strong>Progress Tracking:</strong> Never miss an
                        important deadline or follow-up
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                    >
                      <CheckCircleOutlineIcon
                        color="primary"
                        sx={{ mt: 0.5 }}
                      />
                      <Typography variant="body1" color="text.secondary">
                        <strong>Smart Analytics:</strong> Make data-driven
                        decisions to improve your success rate
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                    pt: 3,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleOutlineIcon color="primary" />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      Free to use • No credit card required • Instant access
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
            zIndex: 1,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "70%",
            height: "200%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
            transform: "rotate(30deg)",
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography
              component="h2"
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "4px",
                  backgroundColor: "white",
                  borderRadius: "2px",
                },
              }}
            >
              Ready to streamline your job search?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                opacity: 0.9,
                maxWidth: 600,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                lineHeight: 1.6,
              }}
            >
              Start organizing your job applications today and take control of
              your career journey.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/add-job")}
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  bgcolor: "white",
                  color: "primary.main",
                  py: 1.5,
                  px: 4,
                  fontWeight: 600,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "grey.100",
                    transform: "translateY(-3px)",
                    boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/jobs")}
                startIcon={<WorkIcon />}
                sx={{
                  borderColor: "white",
                  color: "white",
                  py: 1.5,
                  px: 4,
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                View Jobs
              </Button>
            </Box>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                alignItems: "center",
                gap: 1,
                opacity: 0.8,
              }}
            >
              <CheckCircleOutlineIcon fontSize="small" />
              <Typography variant="body2">
                No credit card required • Free to use
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
