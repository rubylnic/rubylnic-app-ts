import React, { PropsWithChildren } from "react";
import { styled } from '@mui/system';
import { Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';


const StyledForm = styled('form')({
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
});

type FormTemplatePropsType = {
    title?: string,
    onSubmit: () => void,
}

export default function FormTemplate({ children, title, ...props }: PropsWithChildren<FormTemplatePropsType>) {
    const theme = useTheme();

    return (
        <StyledForm {...props} noValidate>
            {title ? <Typography component="h2" variant="h5" color={theme.palette.primary[700]}>{title}</Typography> : null}
            {children}
        </StyledForm>
    );
};