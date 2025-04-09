import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Box,
  TablePagination,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Divider,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Launch as LaunchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Link as LinkIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  Description as DescriptionIcon,
  Notes as NotesIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";

function JobList() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    company: "",
    position: "",
    dateFrom: "",
    dateTo: "",
  });

  // Edit dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editedJob, setEditedJob] = useState({
    company: "",
    position: "",
    status: "",
    appliedDate: "",
    jobLink: "",
    location: "",
    salary: "",
    description: "",
    notes: "",
  });

  // View mode state
  const [viewMode, setViewMode] = useState("table");
  const [expandedJob, setExpandedJob] = useState(null);

  // Apply filters whenever jobs or filters change
  useEffect(() => {
    let result = [...jobs];

    if (filters.status) {
      result = result.filter((job) => job.status === filters.status);
    }

    if (filters.company) {
      result = result.filter((job) =>
        job.company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    if (filters.position) {
      result = result.filter((job) =>
        job.position.toLowerCase().includes(filters.position.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter((job) => new Date(job.appliedDate) >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of the day
      result = result.filter((job) => new Date(job.appliedDate) <= toDate);
    }

    setFilteredJobs(result);
    setPage(0); // Reset to first page when filters change
  }, [jobs, filters]);

  const getStatusColor = (status) => {
    const colors = {
      Applied: { color: "info", bg: "info.lighter" },
      Interview: { color: "warning", bg: "warning.lighter" },
      Offer: { color: "success", bg: "success.lighter" },
      Rejected: { color: "error", bg: "error.lighter" },
      Accepted: { color: "success", bg: "success.lighter" },
    };
    return colors[status] || { color: "default", bg: "grey.100" };
  };

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      status: "",
      company: "",
      position: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const handleApplyFilters = () => {
    setFilterOpen(false);
  };

  // Edit handlers
  const handleEditOpen = (job) => {
    setSelectedJob(job);
    setEditedJob({
      company: job.company,
      position: job.position,
      status: job.status,
      appliedDate: job.appliedDate,
      jobLink: job.jobLink || "",
      location: job.location || "",
      salary: job.salary || "",
      description: job.description || "",
      notes: job.notes || "",
    });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedJob(null);
    setEditedJob({
      company: "",
      position: "",
      status: "",
      appliedDate: "",
      jobLink: "",
      location: "",
      salary: "",
      description: "",
      notes: "",
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedJob({
      ...editedJob,
      [name]: value,
    });
  };

  const handleEditSave = () => {
    if (selectedJob) {
      const updatedJobs = jobs.map((job) => {
        if (job.id === selectedJob.id) {
          return {
            ...job,
            company: editedJob.company,
            position: editedJob.position,
            status: editedJob.status,
            appliedDate: editedJob.appliedDate,
            jobLink: editedJob.jobLink,
            location: editedJob.location,
            salary: editedJob.salary,
            description: editedJob.description,
            notes: editedJob.notes,
          };
        }
        return job;
      });

      setJobs(updatedJobs);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs));
      handleEditClose();
    }
  };

  // View mode handlers
  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const handleToggleExpand = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  // Get unique status values for the filter dropdown
  const statusOptions = [...new Set(jobs.map((job) => job.status))];

  // Available status options for the edit dialog
  const availableStatuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
    "Accepted",
  ];

  // Calculate application statistics
  const getApplicationStats = () => {
    const total = jobs.length;
    const active = jobs.filter(
      (job) => job.status === "Applied" || job.status === "Interview"
    ).length;
    const interviews = jobs.filter((job) => job.status === "Interview").length;
    const offers = jobs.filter((job) => job.status === "Offer").length;
    const accepted = jobs.filter((job) => job.status === "Accepted").length;
    const rejected = jobs.filter((job) => job.status === "Rejected").length;

    // Calculate response rate
    const responseRate = total > 0 ? Math.round((interviews / total) * 100) : 0;

    // Calculate success rate (offers / interviews)
    const successRate =
      interviews > 0 ? Math.round((offers / interviews) * 100) : 0;

    // Calculate acceptance rate (accepted / offers)
    const acceptanceRate =
      offers > 0 ? Math.round((accepted / offers) * 100) : 0;

    // Get industry breakdown
    const industries = {};
    jobs.forEach((job) => {
      const industry = job.industry || "Other";
      industries[industry] = (industries[industry] || 0) + 1;
    });

    // Get monthly application trend
    const monthlyTrend = {};
    jobs.forEach((job) => {
      const date = new Date(job.appliedDate);
      // Format date as "YYYY-MM-DD" for daily tracking
      const dateStr = date.toISOString().split("T")[0];
      monthlyTrend[dateStr] = (monthlyTrend[dateStr] || 0) + 1;
    });

    // Sort dates chronologically
    const sortedDates = Object.keys(monthlyTrend).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    const sortedMonthlyTrend = {};
    sortedDates.forEach((date) => {
      sortedMonthlyTrend[date] = monthlyTrend[date];
    });

    return {
      total,
      active,
      interviews,
      offers,
      accepted,
      rejected,
      responseRate,
      successRate,
      acceptanceRate,
      industries,
      monthlyTrend: sortedMonthlyTrend,
    };
  };

  const stats = getApplicationStats();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Job Applications</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            size="small"
            sx={{ mr: 2 }}
          >
            <ToggleButton value="table" aria-label="table view">
              <Tooltip title="Table View">
                <ViewListIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="cards" aria-label="card view">
              <Tooltip title="Card View">
                <ViewModuleIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={handleFilterOpen}
          >
            Filter
            {Object.values(filters).some((value) => value) && (
              <Chip
                size="small"
                color="primary"
                sx={{ ml: 1 }}
                label={Object.values(filters).filter(Boolean).length}
              />
            )}
          </Button>
        </Box>
      </Box>

      {/* Application Stats Summary */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h4" color="primary">
                  {stats.total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Applications
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ height: "100%", bgcolor: "info.lighter" }}>
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h4" color="info.main">
                  {stats.active}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Applications
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ height: "100%", bgcolor: "warning.lighter" }}>
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h4" color="warning.main">
                  {stats.interviews}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Interviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ height: "100%", bgcolor: "success.lighter" }}>
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h4" color="success.main">
                  {stats.offers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Offers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ height: "100%", bgcolor: "success.lighter" }}>
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h4" color="success.main">
                  {stats.accepted}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accepted
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card sx={{ height: "100%", bgcolor: "error.lighter" }}>
              <CardContent sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h4" color="error.main">
                  {stats.rejected}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rejected
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Application Performance Metrics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Application Performance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Response Rate
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={stats.responseRate}
                      color="info"
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stats.responseRate}%
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stats.interviews} out of {stats.total} applications led to
                  interviews
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Interview Success Rate
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={stats.successRate}
                      color="warning"
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stats.successRate}%
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stats.offers} out of {stats.interviews} interviews led to
                  offers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Offer Acceptance Rate
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={stats.acceptanceRate}
                      color="success"
                      sx={{ height: 10, borderRadius: 5 }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {stats.acceptanceRate}%
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stats.accepted} out of {stats.offers} offers were accepted
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Industry Breakdown */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Industry Breakdown
        </Typography>
        <Card>
          <CardContent>
            {Object.keys(stats.industries).length > 0 ? (
              <Grid container spacing={2}>
                {Object.entries(stats.industries).map(([industry, count]) => {
                  const percentage = Math.round((count / stats.total) * 100);

                  return (
                    <Grid item xs={12} sm={6} md={4} key={industry}>
                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.5,
                          }}
                        >
                          <Typography variant="body2">{industry}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {count} ({percentage}%)
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No industry data available
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Table View */}
      {viewMode === "table" && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Job Link</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((job) => {
                  const statusStyle = getStatusColor(job.status);
                  return (
                    <TableRow
                      key={job.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {job.company}
                        </Typography>
                        {job.location && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            <LocationIcon
                              fontSize="small"
                              sx={{ verticalAlign: "middle", mr: 0.5 }}
                            />
                            {job.location}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {job.position}
                        {job.salary && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            <SalaryIcon
                              fontSize="small"
                              sx={{ verticalAlign: "middle", mr: 0.5 }}
                            />
                            {job.salary}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={job.status}
                          color={statusStyle.color}
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: `${statusStyle.color}.dark`,
                            fontWeight: 500,
                          }}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(job.appliedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {job.jobLink && (
                          <Tooltip title="Open Job Link">
                            <IconButton
                              size="small"
                              href={job.jobLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <LaunchIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit Application">
                          <IconButton
                            size="small"
                            onClick={() => handleEditOpen(job)}
                            sx={{ color: "primary.main", mr: 1 }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(job.id)}
                            sx={{ color: "error.main" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {filteredJobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No job applications found.{" "}
                      {Object.values(filters).some((value) => value) &&
                        "Try adjusting your filters."}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredJobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Card View */}
      {viewMode === "cards" && (
        <Box>
          <Grid container spacing={2}>
            {filteredJobs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((job) => {
                const statusStyle = getStatusColor(job.status);
                const isExpanded = expandedJob === job.id;

                return (
                  <Grid item xs={12} sm={6} md={4} key={job.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "visible",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: 10,
                          zIndex: 1,
                        }}
                      >
                        <Chip
                          label={job.status}
                          color={statusStyle.color}
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: `${statusStyle.color}.dark`,
                            fontWeight: 500,
                            boxShadow: 1,
                          }}
                          size="small"
                        />
                      </Box>

                      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                        <Typography variant="h6" component="div" gutterBottom>
                          {job.company}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          {job.position}
                        </Typography>

                        <List dense disablePadding>
                          {job.location && (
                            <ListItem disableGutters>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <LocationIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={job.location} />
                            </ListItem>
                          )}

                          {job.salary && (
                            <ListItem disableGutters>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <SalaryIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={job.salary} />
                            </ListItem>
                          )}

                          <ListItem disableGutters>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CalendarIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={`Applied: ${new Date(
                                job.appliedDate
                              ).toLocaleDateString()}`}
                            />
                          </ListItem>
                        </List>

                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ mt: 2 }}>
                            <Divider sx={{ my: 1 }} />

                            {job.description && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  <DescriptionIcon
                                    fontSize="small"
                                    sx={{ mr: 1, verticalAlign: "middle" }}
                                  />
                                  Job Description
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {job.description}
                                </Typography>
                              </Box>
                            )}

                            {job.notes && (
                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  <NotesIcon
                                    fontSize="small"
                                    sx={{ mr: 1, verticalAlign: "middle" }}
                                  />
                                  Notes
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {job.notes}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Collapse>
                      </CardContent>

                      <CardActions
                        sx={{ justifyContent: "space-between", p: 2 }}
                      >
                        <Box>
                          <Button
                            size="small"
                            endIcon={
                              isExpanded ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )
                            }
                            onClick={() => handleToggleExpand(job.id)}
                          >
                            {isExpanded ? "Less" : "More"}
                          </Button>
                        </Box>
                        <Box>
                          {job.jobLink && (
                            <Tooltip title="Open Job Link">
                              <IconButton
                                size="small"
                                href={job.jobLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ mr: 1 }}
                              >
                                <LaunchIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Edit Application">
                            <IconButton
                              size="small"
                              onClick={() => handleEditOpen(job)}
                              sx={{ color: "primary.main", mr: 1 }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(job.id)}
                              sx={{ color: "error.main" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>

          {filteredJobs.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No job applications found.{" "}
                {Object.values(filters).some((value) => value) &&
                  "Try adjusting your filters."}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <TablePagination
              rowsPerPageOptions={[6, 12, 24]}
              component="div"
              count={filteredJobs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      )}

      {/* Filter Dialog */}
      <Dialog
        open={filterOpen}
        onClose={handleFilterClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Filter Job Applications</Typography>
            {Object.values(filters).some((value) => value) && (
              <Button
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                color="error"
                size="small"
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  label="Status"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                placeholder="Filter by company name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Position"
                name="position"
                value={filters.position}
                onChange={handleFilterChange}
                placeholder="Filter by job position"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date From"
                name="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date To"
                name="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterClose}>Cancel</Button>
          <Button
            onClick={handleApplyFilters}
            variant="contained"
            color="primary"
          >
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Application Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Edit Job Application</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedJob && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    value={editedJob.company}
                    onChange={handleEditChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={editedJob.position}
                    onChange={handleEditChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="status-edit-label">Status</InputLabel>
                    <Select
                      labelId="status-edit-label"
                      name="status"
                      value={editedJob.status}
                      onChange={handleEditChange}
                      label="Status"
                    >
                      {availableStatuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Chip
                              label={status}
                              color={getStatusColor(status).color}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            {status}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Applied Date"
                    name="appliedDate"
                    type="date"
                    value={editedJob.appliedDate}
                    onChange={handleEditChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Link"
                    name="jobLink"
                    value={editedJob.jobLink}
                    onChange={handleEditChange}
                    placeholder="https://example.com/job-posting"
                    helperText="Optional: URL to the job posting"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={editedJob.location}
                    onChange={handleEditChange}
                    placeholder="e.g. New York, NY or Remote"
                    helperText="Optional: Job location"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    value={editedJob.salary}
                    onChange={handleEditChange}
                    placeholder="e.g. $80,000 - $100,000"
                    helperText="Optional: Salary range or amount"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Description"
                    name="description"
                    value={editedJob.description}
                    onChange={handleEditChange}
                    multiline
                    rows={3}
                    placeholder="Brief description of the job"
                    helperText="Optional: Job description or key responsibilities"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    name="notes"
                    value={editedJob.notes}
                    onChange={handleEditChange}
                    multiline
                    rows={3}
                    placeholder="Your notes about this application"
                    helperText="Optional: Personal notes, follow-up reminders, etc."
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            color="primary"
            disabled={
              !editedJob.company ||
              !editedJob.position ||
              !editedJob.status ||
              !editedJob.appliedDate
            }
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default JobList;
