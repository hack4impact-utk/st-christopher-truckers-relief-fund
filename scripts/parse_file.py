import os


def main() -> None:
    """Main function to parse the file"""

    file_path = os.path.join(os.getcwd(), "result.txt")
    parsed_file_path = os.path.join(os.getcwd(), "parsed.txt")

    with open(file_path, "r") as file:
        with open(parsed_file_path, "w") as parsed_file:
            for line in file:
                if line.startswith("Successfully created client"):
                    continue
                parsed_file.write(line)


if __name__ == "__main__":
    main()
