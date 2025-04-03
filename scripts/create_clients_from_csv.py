"""
This script creates clients from a CSV file.
It is used to import all existing SCF clients into the new client management system.
"""

import os
import sys

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
    "isEnrolledInDiabetesPrevention",
    "diabetesPreventionEnrollmentDate",
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
    """Create clients from the DataFrame"""
    for _, row in df.iterrows():
        create_client(row, api_url, api_key)


def create_client(row: pd.Series, api_url: str, api_key: str) -> None:
    """Create a client from the row"""

    client_creation_request = get_client_creation_request(row)

    print(client_creation_request)

    # response = requests.post(
    #     api_url,
    #     json=client_creation_request,
    #     headers={
    #         "Content-Type": "application/json",
    #         "x-api-key": api_key,
    #     },
    #     timeout=10,
    # )

    # if response.status_code != 200:
    #     print(f"Error: Failed to create client {row['email']}")
    #     print(response.json())
    #     return

    # print(f"Successfully created client {row['email']}")


def get_client_creation_request(row: pd.Series) -> dict:
    """Get the client creation request from the row"""

    return {
        "firstName": row["firstName"],
        "lastName": row["lastName"],
        "email": row["email"],
        "phoneNumber": row["phoneNumber"],
        "dateOfBirth": row["dateOfBirth"],
        "sex": row["sex"],
        "isEnrolledInHealthyHabits": row["isEnrolledInHealthyHabits"],
        "healthyHabitsEnrollmentDate": row["healthyHabitsEnrollmentDate"],
        "isEnrolledInDiabetesPrevention": row["isEnrolledInDiabetesPrevention"],
        "diabetesPreventionEnrollmentDate": row["diabetesPreventionEnrollmentDate"],
        "isEnrolledInRigsWithoutCigs": row["isEnrolledInRigsWithoutCigs"],
        "rigsWithoutCigsEnrollmentDate": row["rigsWithoutCigsEnrollmentDate"],
        "isEnrolledInVaccineVoucher": row["isEnrolledInVaccineVoucher"],
        "vaccineVoucherEnrollmentDate": row["vaccineVoucherEnrollmentDate"],
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
