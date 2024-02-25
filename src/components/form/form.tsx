'use client'

import React, { useState } from "react";
import { 
  Backdrop,
  Button,
  Card, 
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup, 
  Stack,
  TextField, 
} from "@mui/material";

import styles from "./form.module.scss";

const validateEmail = (email: string) => {
  const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email)
};

interface FormData {
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  age: string,
  studying: string,
  nameStudying: string,
  extraInformation: string
}

export default function Form() {

  const [formData, setFormData] = React.useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    age: '',
    studying: '',
    nameStudying: '',
    extraInformation: ''
  });

  const [backdropOpen, setBackdropOpen] = useState(false);
  const [isCorrectEmail, setIsCorrectEmail] = useState(true);
  const [isCorrectAge, setIsCorrectAge] = useState(true);
  const [isStudying, setIsStudying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleStudyingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsStudying(event.target.value === 'study-yes');
  };

  const handleEmailValidation = (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setIsCorrectEmail(validateEmail(email));
  };

  const handleAgeValidation = (event: React.FocusEvent<HTMLInputElement>) => {
    const age = parseInt(event.target.value);
    setIsCorrectAge((18 < age && age < 100) ? true : false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBackdropOpen(true);
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json() )
    .then((json) => {
      console.log(json);
      setBackdropOpen(false);
      setIsCompleted(true);
    })
    .catch((error) => {
      console.log(error)
      setBackdropOpen(false);
    });
  };

  const formControlLabelRadio = {
    '&.Mui-checked': {
      color: '#20ad67'
    },
    '+ div .MuiFormControlLabel-asterisk': {
      display: 'none'
    },
  }
  return (
    <form id="form" className={styles.form} onSubmit={handleSubmit}>

      <Card className={styles.card}>
        <h1>ReadyTech Task</h1>
        <p>This is a form.</p>
      </Card>

      <Card className={styles.card}>
        <FormLabel className={styles.formLabel}>Personal details</FormLabel>
        <FormControl className={styles.formControl} fullWidth>
          <TextField 
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={styles.formLabel}
            inputProps={{ maxLength: 50 }} 
            label="First Name" 
            placeholder="First Name"
            variant="outlined" 
            fullWidth 
            required 
          />
        </FormControl>
        <FormControl className={`${styles.formControl} ${styles.middleName}`} fullWidth >
          <TextField 
            id="middleName" 
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            className={styles.formLabel}
            inputProps={{ maxLength: 50 }} 
            label="Middle Name" 
            placeholder="Middle Name" 
            variant="outlined" 
            fullWidth 
            helperText="Optional"
          />
        </FormControl>
        <FormControl className={styles.formControl} fullWidth>
          <TextField 
            id="lastName" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={styles.formLabel}
            inputProps={{ maxLength: 50 }} 
            label="Last Name" 
            placeholder="Last Name" 
            variant="outlined" 
            fullWidth 
            required 
          />
        </FormControl>
        <hr className={styles.hr} />
        <FormControl 
          className={styles.formControl} 
          error={!isCorrectEmail} 
          fullWidth
        >
          <TextField 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.formLabel}
            label="Email" 
            placeholder="Email" 
            type="email" 
            variant="outlined" 
            fullWidth 
            required 
            onBlur={handleEmailValidation}
            error={!isCorrectEmail}
          />
          {!isCorrectEmail && <FormHelperText>Incorrect email</FormHelperText>}
        </FormControl>
        <FormControl 
          className={styles.formControl} 
          error={!isCorrectAge}
          fullWidth
        >
          <TextField 
            id="readytech-age" 
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className={styles.formLabel}
            label="Age" 
            placeholder="Age" 
            type="number" 
            variant="outlined"
            fullWidth 
            required 
            onBlur={handleAgeValidation}
            error={!isCorrectAge}
          />
          {!isCorrectAge && <FormHelperText>Incorrect age</FormHelperText>}
        </FormControl>
      </Card>

      <Card className={styles.card}>
        <FormControl fullWidth required>
          <FormLabel 
            id="studying" 
            className={styles.formLabel}
            required
          >
            Are you currently studying?
          </FormLabel>
          <RadioGroup
            aria-labelledby="studying"
            name="studying"
            value={formData.studying}
            onChange={(event) => { handleInputChange(event); handleStudyingChange(event); }}
            className={styles.radioGroup}
          >
            <FormControlLabel value="study-yes" control={<Radio required sx={formControlLabelRadio} />} label="Yes" />
            <FormControlLabel value="study-no" control={<Radio required sx={formControlLabelRadio} />} label="No" />
          </RadioGroup>
        </FormControl>
        {isStudying && (
          <FormControl fullWidth>
            <FormLabel 
              id="label-name-of-study" 
              className={styles.formLabel}
            >
              Please provide the name(s) of what you are studying.
            </FormLabel>
            <TextField 
              id="nameStudying" 
              name="nameStudying"
              value={formData.nameStudying}
              onChange={handleInputChange}
              className={styles.formLabel}
              label="Study details" 
              placeholder="Detail your study here" 
              type="number" 
              variant="outlined" 
              fullWidth 
              multiline 
              rows={6} 
            />
          </FormControl>
        )}
      </Card>

      <Card className={styles.card}>
        <FormControl fullWidth>
          <FormLabel 
            id="label-extra-information" 
            className={styles.formLabel}
          >
            Extra information?
          </FormLabel>
          <TextField 
            id="extraInformation" 
            name="extraInformation"
            value={formData.extraInformation}
            onChange={handleInputChange}
            className={styles.formLabel}
            label="Extra information" 
            placeholder="Enter any additional information here" 
            type="number" 
            variant="outlined" 
            fullWidth 
            multiline 
            rows={6} 
          />
        </FormControl>
      </Card>

      <Card className={styles.card}>
        <FormControl fullWidth>
          <FormLabel id="label-complete-form" className={styles.formLabel}>Complete form</FormLabel>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" fullWidth className={`${styles.formButton} ${styles.buttonCancel}`} >Cancel</Button>
            <Button variant="contained" type="submit" fullWidth className={`${styles.formButton} ${styles.buttonSubmit}`} >Submit</Button>
          </Stack>
          {isCompleted && <FormHelperText className={styles.formResult}>Form submitted</FormHelperText>}
        </FormControl>
      </Card>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      
    </form>
  );
}
