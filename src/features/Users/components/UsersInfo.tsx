import { Alert, Box, CircularProgress, Grid, Skeleton } from '@mui/material';
import UserCard from './UserCard';
import { useGetUsersQuery } from 'src/services/users.service';

type Props = {}

export default function UsersInfo({ }: Props) {
    const { data, error, isLoading } = useGetUsersQuery();

    return (
        <Box>
            {isLoading ?
                <Grid container spacing={2}>
                    {Array.from(Array(8)).map(() =>
                        <Grid item xs={6} md={4} lg={3} >
                            <Skeleton variant="rectangular" width='100%' height={200} />
                        </Grid>)}
                </Grid>
                : <Grid container spacing={2}>{data?.map(userInfo => (
                    <UserCard key={userInfo.id} {...userInfo} />
                ))}</Grid>}
            {error ? <Alert severity="error">{error?.error}</Alert> : null}
        </Box>
    )
}