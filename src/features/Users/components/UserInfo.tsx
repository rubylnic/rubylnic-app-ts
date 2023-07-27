
import ModalEditInfo from 'src/components/modals/ModalEditInfo';
import { Box, Button, Skeleton, Typography, Grid, Paper } from '@mui/material';

import { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { styled } from '@mui/material/styles'
import { useGetUserByIdQuery } from 'src/services/users.service';

type Props = {
    id: string | undefined,
}
type ModalDataType = {
    name: string,
    label: string,
    type: string,
    validate: string,
    stringValue: string,
}
export default function UserInfo({ id }: Props) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const { data, error, isLoading } = useGetUserByIdQuery(id as string);

    const openEditModal = (modalData: ModalDataType) => {
        console.log(modalData)
        setModalOpen(true);
        setModalInfo(modalData)
    }
    const hobbiesArr = data ? Object.entries(data.hobbies).filter(item => item[1] === true) : [];
    let initialHobbies: string = '';
    hobbiesArr.forEach((item, i) => {
        const comma = i === hobbiesArr.length - 1 ? '' : `, `;
        if (item[1] === true) {
            initialHobbies += (item[0]) + comma;
        }
    });

    const formDataSchema = {
        firstName: {
            label: "First name",
            type: 'text',
            validate: 'firstName',
            initialValue: data?.firstName,
            stringValue: data?.firstName,
        },
        lastName: {
            label: "Last name",
            type: 'text',
            validate: 'lastName',
            initialValue: data?.lastName,
            stringValue: data?.lastName,
        },
        email: {
            label: "E-mail",
            type: 'text',
            validate: 'email',
            initialValue: data?.email,
            stringValue: data?.email
        },
        gender: {
            label: "Gender",
            type: 'radio',
            validate: 'radio',
            initialValue: data?.sex,
            stringValue: data?.sex,
            values: [
                { label: "Female", value: 'female' },
                { label: "Male", value: 'male' },
                { label: "Other", value: 'other' },
            ]
        },
        hobbies: {
            label: "Hobbies",
            type: 'checkbox',
            validate: 'checkbox',
            initialValue: data?.hobbies,
            stringValue: initialHobbies,
            values: [
                { label: "reading", value: false },
                { label: "coding", value: false },
                { label: "surfing", value: false },
            ]
        }
    }
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Box>
                {isLoading ?
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {Array.from(Array(10)).map(() =>
                            <Grid item xs={6} >
                                <Skeleton variant="rectangular" width='100%' height={80} />
                            </Grid>)}
                    </Grid>
                    : <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        {Object.entries(formDataSchema).map(item => {
                            const { label, type, validate, stringValue } = item[1];
                            return <Grid item xs={6}>
                                <Item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: "50px" }}>
                                    <Typography>
                                        <span>{label}</span>
                                        {` : `}
                                        <span>{stringValue ? stringValue : '---'}</span>
                                    </Typography>
                                    <Button onClick={() => openEditModal({ name: item[0], ...item[1] })}>
                                        <MdEdit />
                                    </Button>
                                </Item>
                            </Grid>
                        })}

                    </Grid>}
            </Box >

            <ModalEditInfo setModalOpen={setModalOpen} isModalOpen={isModalOpen} modalInfo={modalInfo} id={id} />
        </>
    )
}