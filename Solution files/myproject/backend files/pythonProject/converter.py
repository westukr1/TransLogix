import pandas as pd
import os

# Replace the file path with the actual path to your CSV file
file_path = r'C:\Users\ypyuryk\OneDrive - SoftServe, Inc\TransLogix\Data\10-09-2018.csv'

# Check if the file exists
if os.path.isfile(file_path):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(file_path)

    # Display the first few rows of the DataFrame
    print(df.head())

    # Convert the DataFrame to a different format, e.g., JSON
    json_data = df.to_json(orient='records')

    # Save the JSON data to a file
    json_file_path = 'converted_data.json'
    with open(json_file_path, 'w') as json_file:
        json_file.write(json_data)

    print(f'CSV file has been converted to JSON and saved to {json_file_path}')
else:
    print(f'File not found: {file_path}')