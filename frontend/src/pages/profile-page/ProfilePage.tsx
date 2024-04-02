import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface UserDetails {
    email: String,
    firstName: String,
    lastName: String,
    image: String,
    dob: Date,
    profession: String,
    companyName: String
}

const drawerWidth = 240;

export default function ProfilePage({ uid }: { uid: string }): React.ReactElement {
    const [userProfile, setUserProfile] = useState<UserDetails | null>(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get<UserDetails[]>(`http://localhost:8000/userDetails/${uid}`);
                if (response.data.length > 0) {
                    console.log(response.data[0]);
                    setUserProfile(response.data[0]);
                }
                console.log(response)
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [uid]); 

    const getLink = (text: string) => {
        switch (text) {
            case 'Profile':
                return '/profile';
            case 'Logout':
                return '/logout';
            default:
                return '/';
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        setEditMode(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfile((prevProfile: UserDetails | null) => ({
            ...prevProfile!,
            [name]: value
        }));
    };

    return (
        <Container maxWidth="lg" component="main">
            <Container component="section" maxWidth="lg">
                <Grid container>
                    <Grid item container spacing={3} sx={{ pt: 10 }}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Stack spacing={2} sx={{ alignItems: 'center' }}>
                                        {userProfile && (
                                            <Box>
                                                {/* <Avatar src={userProfile.image} sx={{ width: 120, height: 120 }} /> */}
                                                <Typography variant="h6">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 3, mb: 2 }}
                                    >Edit Photo
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                                        User Details
                                    </Typography>
                                    <Divider />
                                    <div>
                                        {userProfile && (
                                            <div>
                                                {editMode ? (
                                                    <form onSubmit={handleSave}>
                                                        <Grid spacing={2} container>
                                                            <Grid item xs={8}>
                                                                <TextField
                                                                    autoComplete="given-name"
                                                                    name="firstName"
                                                                    fullWidth
                                                                    id="firstName"
                                                                    label="First Name"
                                                                    autoFocus
                                                                />
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <TextField
                                                                    autoComplete="given-name"
                                                                    name="lastName"
                                                                    fullWidth
                                                                    id="lastName"
                                                                    label="Last Name"
                                                                    autoFocus
                                                                />
                                                            </Grid><Grid item xs={8}>
                                                                <TextField
                                                                    autoComplete="given-name"
                                                                    name="email"
                                                                    fullWidth
                                                                    id="email"
                                                                    label="Email"
                                                                    autoFocus
                                                                />
                                                            </Grid>
                                                            <Grid item xs={8}>
                                                                <TextField
                                                                    autoComplete="given-name"
                                                                    name="companyName"
                                                                    fullWidth
                                                                    id="companyName"
                                                                    label="Company Name"
                                                                    autoFocus
                                                                />
                                                            </Grid><Grid item xs={8}>
                                                                <TextField
                                                                    autoComplete="given-name"
                                                                    name="profession"
                                                                    fullWidth
                                                                    id="profession"
                                                                    label="Profession"
                                                                    autoFocus
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                                        <DatePicker
                                                                            label="Date of Birth"
                                                                            defaultValue={dayjs()}
                                                                        />
                                                                    </DemoContainer>
                                                                </LocalizationProvider>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    type="submit"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    sx={{ mt: 3, mb: 2 }}
                                                                >
                                                                    Save
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                ) : <div>
                                                    {userProfile && (
                                                        <Box p={4}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12}>
                                                                    <Typography variant="h6" gutterBottom >
                                                                        First Name: {userProfile.firstName}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography variant="h6" gutterBottom >
                                                                        Last Name: {userProfile.lastName}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography variant="h6" gutterBottom >
                                                                        Email: {userProfile.email}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography variant="h6" >
                                                                        Company Name: {userProfile.companyName}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Typography variant="h6" >
                                                                        Profession: {userProfile.profession}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Button
                                                                        type="submit"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        sx={{ mt: 3, mb: 2 }}
                                                                        onClick={handleEdit}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    )}
                                                </div>}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                                <Divider />
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item xs="auto">
                        <Box sx={{ display: 'flex' }}>
                            <CssBaseline />
                            <Drawer
                                variant="permanent"
                                sx={{
                                    width: drawerWidth,
                                    flexShrink: 0,
                                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                                }}
                            >
                                <Toolbar />
                                <Box sx={{ overflow: 'auto' }}>
                                    <List>
                                        {['Profile', 'Logout'].map((text, index) => (
                                            <ListItem key={text} disablePadding>
                                                <Link to={getLink(text)} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                                        </ListItemIcon>
                                                        <ListItemText primary={text} />
                                                    </ListItemButton>
                                                </Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Divider />
                                </Box>
                            </Drawer>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}