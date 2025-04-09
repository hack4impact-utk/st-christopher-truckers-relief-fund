# Client Creation Scripts

This directory contains scripts for creating client accounts from CSV files.

## Setup

- Create a conda environment:

```bash
conda create -n client-creation python=3.11
conda activate client-creation
```

- Install dependencies:

```bash
pip install -r requirements.txt
```

- Set up environment variables in a `.env` file:

```bash
CSV_FILE_LOCATION="/path/to/your/clients.csv"
API_URL="https://your-api-url/api/users/actions/create-client-account"
API_KEY="your-api-key"
```

## CSV File Format

The CSV file should have the following headers matching the client creation schema:

- firstName
- lastName
- email
- dateOfBirth (format: MM/DD/YYYY)
- sex (must be "male" or "female")
- phoneNumber
- isEnrolledInHealthyHabits
- healthyHabitsEnrollmentDate (format: MM/DD/YYYY)
- isEnrolledInDiabetesPrevention
- diabetesPreventionEnrollmentDate (format: MM/DD/YYYY)
- isEnrolledInRigsWithoutCigs
- rigsWithoutCigsEnrollmentDate (format: MM/DD/YYYY)
- isEnrolledInVaccineVoucher
- vaccineVoucherEnrollmentDate (format: MM/DD/YYYY)
- isEnrolledInGetPreventativeScreenings
- getPreventativeScreeningsEnrollmentDate (format: MM/DD/YYYY)

## Usage

Run the script to create client accounts:

```bash
python create_clients_from_csv.py
```
