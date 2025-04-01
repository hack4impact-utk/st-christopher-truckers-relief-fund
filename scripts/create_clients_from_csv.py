import os
from datetime import datetime

import pandas as pd
import requests
from dotenv import load_dotenv

REQUIRED_COLUMNS = [

]

DEFAULT_DATE_FORMAT = "%m/%d/%Y"


def load_environment_variables() -> tuple[str, str, str]:
    """Load environment variables from .env file"""
    load_dotenv()

    CSV_FILE_LOCATION = os.getenv("CSV_FILE_LOCATION")
    API_URL = os.getenv("API_URL")
    API_KEY = os.getenv("API_KEY")

    if not all([CSV_FILE_LOCATION, API_URL, API_KEY]):
        print(
            "Error: Please set CSV_FILE_LOCATION, API_URL, and API_KEY environment variables"
        )
        exit(1)

    return CSV_FILE_LOCATION, API_URL, API_KEY


def main():
    """Main function to read CSV file and create clients"""
    # step 1: load environment variables
    CSV_FILE_LOCATION, API_URL, API_KEY = load_environment_variables()

    # step 2: load CSV file
    df = pd.read_csv(CSV_FILE_LOCATION)

    # step 3: check that all required columns are present



if __name__ == "__main__":
    main()
