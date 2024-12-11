from videodb import connect
from dotenv import load_dotenv
import os
load_dotenv()

conn = connect(api_key=os.getenv("VIDEODB_KEY"))
