import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { MdDeleteOutline, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { IUser } from 'src/interfaces/users.interface';
import { useNavigate } from "react-router-dom";
import { useDeleteUserByIdMutation, useEditUserByIdMutation } from 'src/services/users.service';

function UserCard({ firstName, lastName, email, sex, fav, id }: IUser) {
    const navigate = useNavigate();
    const [
        deleteUser,
        result,
    ] = useDeleteUserByIdMutation();


    const [
        editUser,
        userResult,
    ] = useEditUserByIdMutation()

    const onDeleteUser = () => {
        deleteUser(id);
    }

    const onAddToFavs = () => {
        editUser({ id, data: { fav: !fav } })
    }

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Card sx={{ minWidth: 275, position: 'relative' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {firstName}
                    </Typography>
                    <Typography variant="h5" component="div">
                        <span>{firstName}</span> <span>{lastName}</span>
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {email}
                    </Typography>
                    <Typography variant="body2">
                        {sex}
                    </Typography>
                    <Button onClick={onDeleteUser} sx={{ position: 'absolute', top: '10px', right: '0' }}>
                        <MdDeleteOutline />
                    </Button>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => { navigate(`/user/${id}`) }}>Learn More</Button>
                </CardActions>
                <Button onClick={onAddToFavs} sx={{ position: 'absolute', bottom: '10px', right: '0' }}>
                    {fav ? <MdFavorite /> : <MdFavoriteBorder />}
                </Button>
            </Card>
        </Grid>
    )
}

export default UserCard