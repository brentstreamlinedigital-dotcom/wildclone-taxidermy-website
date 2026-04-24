import pandas as pd
try:
    xl = pd.ExcelFile("Shipping Costs.xlsx")
    print("Sheets:", xl.sheet_names)
    for sheet in xl.sheet_names:
        print(f"\n--- {sheet} ---")
        df = xl.parse(sheet)
        print(df.to_string())
except Exception as e:
    print(e)
