const  express =  require("express");
const  cors= require ("cors");
const  mongoose= require ("mongoose");
const router1 = require("./routes/user.js");
const  router2  = require("./routes/recipes.js");


const app = express();

app.use(express.json());

app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use("/auth",router1 );
app.use("/recipes", router2);

mongoose.connect(
  "mongodb+srv://sahebbali253:saheb1234@cluster0.tpscdwz.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  }
).then(() => {
  console.log('Database Connection Success');
})
.catch((error) => {
  console.log(error);
});;
let Port = 8000
app.listen(Port, () => console.log(`Server Started: ${Port}`));
