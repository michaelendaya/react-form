import { Button, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignInForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        props.signIn(data);
    };
    return (
        <Box sx={{ width: '100%' }}>
            < form onSubmit={handleSubmit(onSubmit)} >
                <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                    {props.invalid && "Invalid User Credentials"}
                </Typography>
                <TextField id="outlined-basic"
                    fullWidth label="Student ID Number" variant="outlined" sx={{ marginBottom: 1 }} {...register("id_number", {
                        required: "Please enter your Student Number", pattern: {
                            value: /^[0-9]{8}$/,
                            message: "Please enter a valid Student Number"
                        }
                    })} />
                <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                    {errors.id_number?.type === 'required' && "Please enter your Student Number"}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                    {errors.id_number?.type === 'pattern' && "Please enter a valid Student Number [8 digits]"}
                </Typography>

                <TextField id="outlined-basic" fullWidth label="Password" variant="outlined" sx={{ marginBottom: 1 }} type="password"
                    {...register("password", { required: "Please enter your password" })} />
                <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                    {errors.password?.type === 'required' && "Please enter your password"}

                </Typography>
                <Button variant="contained" fullWidth type="submit">Sign In</Button>
            </form >
        </Box>

    )
}
export default SignInForm;