import { Container, CssBaseline, Typography } from '@mui/material';
import { Box } from '@mui/system'
import { Link } from "react-router-dom";
import { RxGithubLogo } from 'react-icons/rx';



export default function StickyFooter() {
    return (

        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary">
                    the app is made by
                    <Link color="inherit" to="https://github.com/rubylnic" style={{ marginLeft: '5px', display: 'flex', alignItems: 'center', }}>
                        {'rubylnic © '}
                        <RxGithubLogo />
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>


    );
}
