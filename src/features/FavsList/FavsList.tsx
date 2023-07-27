import { Box, Skeleton, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import { useGetFavUsersQuery } from 'src/services/users.service';
import UserCard from '../Users/components/UserCard';


type Props = {}

export default function FavsList({ }: Props) {
    const { data, error, isLoading, refetch } = useGetFavUsersQuery(null)
    return (
        <Box sx={{ minWidth: '200px' }}>
            {isLoading ? <Skeleton variant="rectangular" width={210} height={118} /> :

                <Stack spacing={2}>
                    {data?.length > 0 ? data.map(userInfo => (
                        <UserCard key={userInfo.id} {...userInfo} />
                    )) : <Typography ml="20px">No favorite users yet</Typography>}
                </Stack>

            }

        </Box>
    )
}