import { Autocomplete, Button, Grid, TextField, Stepper, Step, StepLabel, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
const steps = [
    'Credentials',
    'Personal Information',
    'Academic Information',
];

function Credentials(props) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    return (
        <form onSubmit={handleSubmit(props.handleNext)}>
            <TextField fullWidth label="Student ID Number" {...register("id_number",
                {
                    required: "Please enter your Student Number",
                    pattern: {
                        value: /^[0-9]{8}$/,
                        message: "Please enter a valid Student Number"
                    }
                })}
                variant="outlined" sx={{ marginBottom: 1 }} />
            <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                {errors.id_number?.type === 'required' && "Please enter your Student Number"}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                {errors.id_number?.type === 'pattern' && "Please enter a valid Student Number [8 digits]"}
            </Typography>
            <TextField fullWidth label="Password" variant="outlined" sx={{ marginBottom: 1 }} type="password"  {...register("password", {
                required: "Please enter your password", minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                }
            })} />
            <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                {errors.password?.type === 'required' && "Please enter your password"}
            </Typography>

            <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                {errors.password?.type === 'minLength' && "Password must be at least 8 character"}
            </Typography>
            <TextField fullWidth label="Confirm Password" variant="outlined" sx={{ marginBottom: 1 }} type="password"  {...register("c_password", {
                required: "Please confirm your password",
                validate: (val) => {
                    if (watch('password') != val) {
                        return "Your passwords do no match";
                    }
                },
            })} />
            <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                {errors.c_password?.type === 'validate' && "Password does not match"}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                {errors.c_password?.type === 'required' && "Please confrim your password"}
            </Typography>


            <Button variant="contained" fullWidth type="submit">Next</Button>
        </form>
    )
};
function PersonalInformation(props) {
    const { register, handleSubmit, control, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(props.handleNext)}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }}>
                <Grid item xs={6}>
                    <TextField label="First Name" variant="outlined" sx={{ marginBottom: 1 }} {...register("first_name", { required: "Please enter your first name" })} />
                    <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                        {errors.first_name?.type === 'required' && "Please enter your first name"}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Middle Name" variant="outlined" sx={{ marginBottom: 1 }} {...register("second_name", { required: "Please enter your second" })} />
                    <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                        {errors.second_name?.type === 'required' && "Please enter your second name"}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Last Name" variant="outlined" sx={{ marginBottom: 1 }} {...register("last_name", { required: "Please enter your last" })} />
                    <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '-5px', color: 'red' }}>
                        {errors.last_name?.type === 'required' && "Please enter your last name"}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: 'Please enter you gender' }}
                        render={({ field }) =>
                            <Autocomplete disablePortal
                                {...field}
                                options={[{ label: 'male' }, { label: 'female' }]}
                                onChange={(_, data) => field.onChange(data.label)}
                                renderInput={(params) => <TextField {...params} label="Gender" />}
                            />} />
                    <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '3px', color: 'red' }}>
                        {errors.gender?.type === 'required' && "Please enter your gender"}
                    </Typography>
                </Grid>
            </Grid>
            <Button variant="contained" fullWidth type="submit">Next</Button>
            <Button variant="outlined" fullWidth onClick={props.handleBack} sx={{ marginTop: 1 }}>Back</Button>
        </form>
    )
};
function AcademicInformation(props) {
    const { handleSubmit, control, formState: { errors } } = useForm();
    return (
        <form onSubmit={handleSubmit(props.handleNext)}>
            <Controller
                name="college"
                control={control}
                rules={{ required: 'Please enter your college' }}
                render={({ field }) =>
                    <Autocomplete disablePortal    {...field}
                        sx={{ marginBottom: 1 }}
                        onChange={(_, data) => field.onChange(data.label)}
                        fullWidth
                        options={college}
                        renderInput={(params) => <TextField {...params} label="College" />}
                    />} />
            <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '3px', color: 'red' }}>
                {errors.college?.type === 'required' && "Please enter your college"}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }} sx={{ marginBottom: 1 }}>
                <Grid item xs={6} sx={{ marginBottom: 1 }}>
                    <Controller
                        name="program"
                        control={control}
                        rules={{ required: 'Please enter your program' }}
                        render={({ field }) =>
                            <Autocomplete disablePortal
                                fullWidth
                                {...field}
                                options={course}
                                onChange={(_, data) => field.onChange(data.label)}
                                renderInput={(params) =>
                                    <TextField {...params} label="Program" />}
                            />} />
                    <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '3px', color: 'red' }}>
                        {errors.program?.type === 'required' && "Please enter your program"}
                    </Typography></Grid>
                <Grid item xs={6} sx={{ marginBottom: 1 }}>
                    <Controller
                        name="level"
                        control={control}
                        rules={{ required: 'Please enter your year level' }}
                        render={({ field }) =>
                            <Autocomplete disablePortal   {...field}
                                onChange={(_, data) => field.onChange(data.label)}
                                options={[{ label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }, { label: '5' }]}
                                renderInput={(params) =>
                                    <TextField {...params} label="Year Level" />}
                            />} />
                    <Typography variant="caption" display="block" gutterBottom sx={{ marginTop: '3px', color: 'red' }}>
                        {errors.level?.type === 'required' && "Please enter your year level"}
                    </Typography></Grid>
            </Grid>
            <Button variant="contained" fullWidth type="submit">Submit</Button>
            <Button variant="outlined" fullWidth onClick={props.handleBack} sx={{ marginTop: 1 }}>Back</Button>

        </form>
    )
}
function CurrentStep(props) {
    console.log(props.step)
    var current = props.step;
    switch (current) {
        case 0:
            return Credentials(props);
        case 1:
            return PersonalInformation(props);
        case 2:
            return AcademicInformation(props);
        default:
            return
    }
}
const SignUpForm = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = (data) => {
        console.log(data)
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        if (activeStep === 2) {
            props.handleSubmit(data)
        }
    }
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }
    return (

        <Box sx={{ width: '80%' }}>
            <Stepper activeStep={activeStep} nonLinear alternativeLabel>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stepper>
            <CurrentStep step={activeStep} handleNext={handleNext} handleBack={handleBack} sx={{ width: '100px' }} />
        </Box>
    )
}
const course = [
    { label: 'BS Psychology' },
    { label: 'BS Basic Human Studies (LEAPMed)' },
    { label: 'BS Biology, major in Industrial Biology' },
    { label: 'BS Biology, major in Environmental Biology' },
    { label: 'BS Tourism Management, major in Travel Operations and Service Management' },
    { label: 'BS Hospitality Management, major in Culinary Entrepreneurship' },
    { label: 'Bachelor of Music in Performance' },
    { label: 'Bachelor of Music in Musicology' },
    { label: 'BS Food Technology' },
    { label: 'Bachelor of Science in Sports Science' },
    { label: 'BS Business Administration, major in Marketing Management' },
    { label: 'BS Business Administration, major in Human Resource Management' },
    { label: 'BS in Business Administration, major in Financial Management' },
    { label: 'BS in Business Administration, major in Business Economics' },
    { label: 'BS Nutrition and Dietetics' },
    { label: 'BS Pharmacy, major in Clinical Pharmacy' },
    { label: 'Bachelor of Laws' },
    { label: 'Bachelor of Music in Composition' },
    { label: 'Bachelor of Music in Music Theatre' },
    { label: 'Bachelor of Music in Music Technology' },
    { label: 'Bachelor of Music in Music Education' },
    { label: 'BS Interior Design' },
    { label: 'Bachelor of Fine Arts, major in Painting' },
    { label: 'Bachelor of Fine Arts, major in Industrial Design' },
    { label: 'Bachelor of Fine Arts, major in Advertising' },
    { label: 'Bachelor of Physical Education, major in Sports and Wellness Management' },
    { label: 'Bachelor of Secondary Education' },
    { label: 'Bachelor in Library and Information Science' },
    { label: 'Bachelor of Elementary Education' },
    { label: 'BS Hospitality Management' },
    { label: 'BS Entrepreneurship' },
    { label: 'BS Applied Physics' },
    { label: 'BS Biology' },
    { label: 'BS Information Systems' },
    { label: 'BS Information Technology' },
    { label: 'BS Computer Science' },
    { label: 'BS Architecture' },
    { label: 'BS Microbiology' },
    { label: 'BS Chemistry' },
    { label: 'BS Electronics Engineering' },
    { label: 'BS Civil Engineering' },
    { label: 'BS Chemical Engineering' },
    { label: 'BS Industrial Engineering' },
    { label: 'BS Electrical Engineering' },
    { label: 'BS Mechanical Engineering' },
    { label: 'AB in Sociology' },
    { label: 'AB in Political Science' },
    { label: 'AB in Philosophy' },
    { label: 'AB in Literature' },
    { label: 'AB in Legal Management' },
    { label: 'AB in Journalism' },
    { label: 'AB in History' },
    { label: 'AB in English Language Studies' },
    { label: 'AB in Economics' },
    { label: 'AB in Creative Writing' },
    { label: 'AB in Communication' },
    { label: 'AB in Behavioral Science' },
    { label: 'AB in Asian Studies' },
    { label: 'BS Nursing' },
    { label: 'BS Speech-Language Pathology' },
    { label: 'BS Physical Therapy' },
    { label: 'BS Occupational Therapy' },
    { label: 'BS Pharmacy' },
    { label: 'BS Biochemistry' },
    { label: 'BS Medical Technology' },
    { label: 'BS Accounting Information Systems' },
    { label: 'BS Management Accounting' },
    { label: 'BS Accountancy' },
];
const college = [
    { label: 'UST-Alfredo M. Velayo College of Accountancy' },
    { label: 'College of Architecture' },
    { label: 'Faculty of Arts and Letters' },
    { label: 'Faculty of Civil Law' },
    { label: 'College of Commerce and Business Administration' },
    { label: 'College of Education' },
    { label: 'Faculty of Engineering' },
    { label: 'College of Fine Arts and Design' },
    { label: 'College of Information and Computing Sciences' },
    { label: 'Conservatory of Music' },
    { label: 'College of Nursing' },
    { label: 'Faculty of Pharmacy' },
    { label: 'Institute of Physical Education and Athletics' },
    { label: 'College of Rehabilitation Sciences' },
    { label: 'College of Science' },
    { label: 'College of Tourism and Hospitality Management' },
]
export default SignUpForm;