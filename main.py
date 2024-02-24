from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import databases
import sqlalchemy

# Database connection configuration
DATABASE_URL = "postgresql://robinjas78:Nevaeh0416@localhost/illinois"
database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

# Define your database table schema here
contacts = sqlalchemy.Table(
    "contacts",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("first_name", sqlalchemy.String),
    sqlalchemy.Column("last_name", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String),
    sqlalchemy.Column("question", sqlalchemy.Text),
)

engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This should be more restrictive in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.post("/submit-form/")
async def submit_form(request: Request):
    form_data = await request.json()
    first_name = form_data.get("firstName")
    last_name = form_data.get("lastName")
    email = form_data.get("email")
    question = form_data.get("question")

    # Here you would add any additional validation or processing needed

    query = contacts.insert().values(
        first_name=first_name, last_name=last_name, email=email, question=question
    )
    last_record_id = await database.execute(query)

    return JSONResponse(content={"message": "Contact information successfully saved", "id": last_record_id})
