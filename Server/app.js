import express from 'express';
import bodyParser from 'body-parser';
import gemini from './Gemini.js';
import cors from 'cors';
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(gemini);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});

