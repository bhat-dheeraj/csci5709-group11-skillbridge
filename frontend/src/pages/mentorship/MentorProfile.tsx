import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type MentorDetails = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  imageUrl: string;
  ratings: string;
  bio: string;
  experience: string;
  pay: string;
  expertise: string;
};

const DEFAULT_VALUES_FOR_MENTOR_DATA = {
  id: "",
  firstName: "",
  lastName: "",
  gender: "",
  imageUrl: "",
  ratings: "0",
  bio: "",
  experience: "",
  pay: "0",
  expertise: "",
};

const MentorProfile = () => {
  const { id } = useParams();
  const [mentorData, setMentorData] = useState<MentorDetails>(
    DEFAULT_VALUES_FOR_MENTOR_DATA
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/mentor/${id}`
        );
        setMentorData(response.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to Fetch the Mentor");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMentor();
    }
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Grid component="main">
      <Typography variant="h5">Mentor Profile</Typography>
      <Divider />
      <Paper sx={{ mt: 2, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Box>
              <img
                src={mentorData?.imageUrl}
                alt="Profile Image"
                width={"100%"}
                height={"100%"}
                style={{ borderRadius: "10px" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Box>
              <Typography variant="h4" fontWeight={600}>
                {mentorData.firstName} {mentorData.lastName}
              </Typography>
              <Box marginTop={1}>
                <Typography variant="h6">
                  Experience : {mentorData.experience} years
                </Typography>
              </Box>
              <Typography variant="h6">
                Area of Expertise : {mentorData.expertise}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={2}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start" }}
          >
            <Box>
              <Rating
                name="read-only"
                value={parseFloat(mentorData.ratings)}
                precision={0.5}
                readOnly
                size="large"
              />
              <Typography variant="h6">$ {mentorData.pay}/hr</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                alignItems: "center",
                display: "flex",
                maxWidth: 300,
                m: "10px auto 0",
              }}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="h4" fontWeight={600}>
          About me
        </Typography>
        <Divider sx={{ mt: 1 }} />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" component="p">
            {mentorData.bio}
          </Typography>
        </Box>
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="h4" fontWeight={600}>
          Personal Details
        </Typography>
        <Divider sx={{ mt: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} marginTop={2} justifyContent={"center"}>
            <Typography variant="subtitle1">Gender</Typography>
            <Typography variant="h6">{mentorData.gender}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} marginTop={2} justifyContent={"center"}>
            <Typography variant="subtitle1">Date of Birth</Typography>
            <Typography variant="h6">01 - 02 - 2000</Typography>
          </Grid>
          <Grid item xs={12} sm={4} marginTop={2} justifyContent={"center"}>
            <Typography variant="subtitle1">
              Where did you hear about us?
            </Typography>
            <Typography variant="h6">Through web search</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <Typography variant="h4" fontWeight={600}>
          Qualifications
        </Typography>
        <Divider sx={{ mt: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} marginTop={2} justifyContent={"center"}>
            <Typography variant="subtitle1">Graduate Degree</Typography>
            <Typography variant="h6">
              Masters of Applied Computer Science
            </Typography>
            <Typography variant="subtitle1">Graduate College</Typography>
            <Typography variant="h6">Dalhousie University</Typography>
          </Grid>
          <Grid item xs={12} sm={6} marginTop={2} justifyContent={"center"}>
            <Typography variant="subtitle1">Undergraduate Degree</Typography>
            <Typography variant="h6">Bachelors of Computer Science</Typography>
            <Typography variant="subtitle1">Undergraduate College</Typography>
            <Typography variant="h6">Conestoga College</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MentorProfile;