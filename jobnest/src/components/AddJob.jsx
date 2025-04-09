import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Box,
} from "@mui/material";

function AddJob() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    company: "",
    position: "",
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0],
    jobLink: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedJobs = JSON.parse(localStorage.getItem("jobs") || "[]");
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
    };
    savedJobs.push(newJob);
    localStorage.setItem("jobs", JSON.stringify(savedJobs));
    navigate("/jobs");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Add New Job Application
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Company"
          name="company"
          value={jobData.company}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Position"
          name="position"
          value={jobData.position}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={jobData.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Applied Date"
          name="appliedDate"
          type="date"
          value={jobData.appliedDate}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          label="Job Link"
          name="jobLink"
          value={jobData.jobLink}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Notes"
          name="notes"
          value={jobData.notes}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Add Job
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => navigate("/jobs")}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default AddJob;
