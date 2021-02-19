import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './LoginForm.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function LoginForm(props) {

    const { onSubmit } = props;
    const classes = useStyles();
    const [author, setAuthor] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'author-field':
                setAuthor(event.target.value);
                break;
            case 'message-field':
                setPassword(event.target.value);
                break;
        }
    };

    const handleSubmit = (event) => {
        setPassword('');
        onSubmit({ author, password });
    };


    return (
        <div className="form-wrapper">
            <form className={classes.root} noValidate autoComplete="off">
                <div className="form-item">
                    <TextField
                        id="author-field"
                        label="Логин"
                        value={author}
                        onChange={handleChange}
                    />
                    <TextField
                        id="message-field"
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <Button onClick={handleSubmit}>Войти</Button>
                </div>
            </form>
        </div>
    );
}
