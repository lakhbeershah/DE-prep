import os
import re

files_dir = r"c:\Users\bunty\OneDrive\Belgeler\learn\L3"
modules_dir = os.path.join(files_dir, "modules")

files_to_fix = [os.path.join(modules_dir, f) for f in os.listdir(modules_dir) if f.endswith(".html")]

# The messed up string happens on aws, domain, sql, airflow, tableau, behavioral, interview
# It shouldn't be in pyspark and databricks, but the regex won't hurt if it's not there.
# Let's write a robust regex that finds the SQL nav item embedded with the wrong links

bad_nav_pattern = re.compile(
    r'(<li><a\s+href="sql\.html"[^>]*>SQL</a>)\s*<a\s+href="pyspark\.html">PySpark</a>\s*<a\s+href="databricks\.html">Databricks</a>(</li>)', 
    flags=re.IGNORECASE
)

for filepath in files_to_fix:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = bad_nav_pattern.sub(r'\1\2', content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed duplicate nav links in {filepath}")
    else:
        print(f"No duplicates found in {filepath}")
