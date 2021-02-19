import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'

import './Lesson3.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
}));

export default function LoginForm(props) {

    const classes = useStyles();
    const [phrase, setPhrase] = React.useState('');
    const [translation, setTranslation] = React.useState('');
    const [parsedData, setParsedData] = React.useState([]);

    const handleChange = (event, id) => {
        switch (id) {
            case 'phrase':
                setPhrase(event.target.value);
                break;
        }
    };

    const handleSubmitParse = (event)=>{
        axios({
            method: 'get',
            url: 'http://localhost:3003/api/v1/parse',
        })
        .then(function(response) {
            setParsedData(response.data);
        })
        .catch(function(error) {
            setParsedData(JSON.stringify(e));
        });    
    }

    const handleSubmitTranslate = (event) => {
        axios({
            method: 'post',
            url: 'http://localhost:3003/api/v1/translate',
            data: {    
                stringToTranslate: phrase,
                targetLanguageCode: "en"
            },
        })
        .then(function(response) {
            setTranslation(response.data.translations.reduce((init, item)=>{
                return init + ' '+item.text;
            },''));
        })
        .catch(function(error) {
            setTranslation(JSON.stringify(e));
        });
    };


    return (
        <div className="form-wrapper">
            <form className={classes.root} noValidate autoComplete="off">
                <div className="form-item">
                    <TextField
                        label="Фраза для перевода на русском языке"
                        value={phrase}
                        onChange={(event)=>handleChange(event, 'phrase')}
                    />
                    <Button onClick={handleSubmitTranslate}>Перевести</Button>
                </div>
            </form>
            <Typography variant="h6">
                {translation}
            </Typography>
            <Button onClick={handleSubmitParse}>Распарсить сайт</Button>
            {parsedData.map((item, idx)=>(
                <Typography key={`parseddata_${idx}`} variant="h6">
                    {item}
                </Typography>
            ))}
        </div>
    );
}
