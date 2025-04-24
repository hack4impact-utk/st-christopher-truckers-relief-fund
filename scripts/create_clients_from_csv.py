"""
This script creates clients from a CSV file.
It is used to import all existing SCF clients into the new client management system.
"""

import concurrent.futures
import os
import sys
from datetime import datetime

import pandas as pd
import requests
from dotenv import load_dotenv

REQUIRED_COLUMNS = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "dateOfBirth",
    "sex",
    "phoneNumber",
    "isEnrolledInHealthyHabits",
    "healthyHabitsEnrollmentDate",
    "isEnrolledInDiabetesPrevention",
    "diabetesPreventionEnrollmentDate",
    "isEnrolledInRigsWithoutCigs",
    "rigsWithoutCigsEnrollmentDate",
    "isEnrolledInVaccineVoucher",
    "vaccineVoucherEnrollmentDate",
    "isEnrolledInGetPreventativeScreenings",
    "getPreventativeScreeningsEnrollmentDate",
]

DEFAULT_DATE_FORMAT = "%m/%d/%Y"


def load_environment_variables() -> tuple[str, str, str]:
    """Load environment variables from .env file"""
    load_dotenv()

    csv_file_location = os.getenv("CSV_FILE_LOCATION")
    api_url = os.getenv("API_URL")
    api_key = os.getenv("API_KEY")

    if not all([csv_file_location, api_url, api_key]):
        print(
            "Error: Please set CSV_FILE_LOCATION, API_URL, and API_KEY environment variables"
        )
        sys.exit(1)

    return csv_file_location, api_url, api_key


def check_required_columns(df: pd.DataFrame) -> bool:
    """Check that all required columns are present in the DataFrame"""

    missing_columns = set(REQUIRED_COLUMNS) - set(df.columns)
    if missing_columns:
        print(f"Error: Missing required columns: {missing_columns}")
        return False

    return True


def create_clients(df: pd.DataFrame, api_url: str, api_key: str) -> None:
    """Create clients from the DataFrame using multithreading"""
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        futures = [
            executor.submit(create_client, row, api_url, api_key)
            for _, row in df.iterrows()
        ]
        for future in concurrent.futures.as_completed(futures):
            try:
                future.result()
            except Exception as e:
                print(f"Error during client creation: {e}")


def create_client(row: pd.Series, api_url: str, api_key: str) -> None:
    """Create a client from the row"""

    client_creation_request = get_client_creation_request(row)

    if client_creation_request == {}:
        return

    response = requests.post(
        api_url,
        json=client_creation_request,
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key,
        },
        timeout=30,
    )

    if response.status_code != 200:
        print(
            f"Error: Failed to create client {row['firstName']} {row['lastName']} with email {row['email']} and phone number {row['phoneNumber']}"
        )
        print(response.json())
        return

    print(f"Successfully created client {row['email']}")


def get_client_creation_request(row: pd.Series) -> dict:
    """Get the client creation request from the row"""

    email = row["email"]
    if pd.isna(email):
        print(
            f"Error: Missing email for {row['firstName']} {row['lastName']}. Skipping..."
        )
        return {}

    # get me the current date in MM/DD/YYYY format using datefns
    current_date = datetime.now().strftime("%m/%d/%Y")

    return {
        "firstName": row["firstName"] if not pd.isna(row["firstName"]) else "Unknown",
        "lastName": row["lastName"] if not pd.isna(row["lastName"]) else "Unknown",
        "email": row["email"] if not pd.isna(row["email"]) else "Unknown",
        "phoneNumber": (
            row["phoneNumber"] if not pd.isna(row["phoneNumber"]) else "Unknown"
        ),
        "dateOfBirth": (
            row["dateOfBirth"] if not pd.isna(row["dateOfBirth"]) else "Unknown"
        ),
        "sex": row["sex"].lower() if not pd.isna(row["sex"]) else "male",
        "isEnrolledInHealthyHabits": (
            row["isEnrolledInHealthyHabits"]
            if not pd.isna(row["isEnrolledInHealthyHabits"])
            else False
        ),
        "healthyHabitsEnrollmentDate": (
            row["healthyHabitsEnrollmentDate"]
            if not pd.isna(row["healthyHabitsEnrollmentDate"])
            else current_date
        ),
        "isEnrolledInDiabetesPrevention": (
            row["isEnrolledInDiabetesPrevention"]
            if not pd.isna(row["isEnrolledInDiabetesPrevention"])
            else False
        ),
        "diabetesPreventionEnrollmentDate": (
            row["diabetesPreventionEnrollmentDate"]
            if not pd.isna(row["diabetesPreventionEnrollmentDate"])
            else current_date
        ),
        "isEnrolledInRigsWithoutCigs": (
            row["isEnrolledInRigsWithoutCigs"]
            if not pd.isna(row["isEnrolledInRigsWithoutCigs"])
            else False
        ),
        "rigsWithoutCigsEnrollmentDate": (
            row["rigsWithoutCigsEnrollmentDate"]
            if not pd.isna(row["rigsWithoutCigsEnrollmentDate"])
            else current_date
        ),
        "isEnrolledInVaccineVoucher": (
            row["isEnrolledInVaccineVoucher"]
            if not pd.isna(row["isEnrolledInVaccineVoucher"])
            else False
        ),
        "vaccineVoucherEnrollmentDate": (
            row["vaccineVoucherEnrollmentDate"]
            if not pd.isna(row["vaccineVoucherEnrollmentDate"])
            else current_date
        ),
        "isEnrolledInGetPreventativeScreenings": (
            row["isEnrolledInGetPreventativeScreenings"]
            if not pd.isna(row["isEnrolledInGetPreventativeScreenings"])
            else False
        ),
        "getPreventativeScreeningsEnrollmentDate": (
            row["getPreventativeScreeningsEnrollmentDate"]
            if not pd.isna(row["getPreventativeScreeningsEnrollmentDate"])
            else current_date
        ),
    }


def main() -> None:
    """Main function to read CSV file and create clients"""

    csv_file_location, api_url, api_key = load_environment_variables()

    df = pd.read_csv(csv_file_location)

    if not check_required_columns(df):
        sys.exit(1)

    create_clients(df, api_url, api_key)


if __name__ == "__main__":
    main()
