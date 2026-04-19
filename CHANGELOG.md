# Version History (Changelog)

This document tracks the major versions of the NBFC Data Engineer Interview Mastery Portal.
Because this project uses Git, **you can securely revert to any of these points at any time** without losing permanent progress.

## v1.2.0 - Navigation & UI Patches (Current)
* **Status:** Live
* **Commit Hash:** `e2b1b85` (or `HEAD`)
* **Changes:**
  * Fixed bug where "Back to Top" did not work because of fixed navbar positioning intercept.
  * Ran global automated test confirming 100% of all links mapped correctly.
  * Cleaned up duplicated PySpark and Databricks links in `sql.html`, `tableau.html`, `domain.html`, `airflow.html`, `aws.html`, `behavioral.html`, and `interview.html`.
  * Normalized the footer linking logic universally.

## v1.1.0 - PySpark & Databricks Expansion
* **Status:** Historical
* **Commit Hash:** `c16987e`
* **Changes:**
  * Created `pyspark.html` (Handling AQE, Skew, Window functions, Streaming).
  * Created `databricks.html` (Lakehouse, Delta Internals, Unity Catalog).
  * Added PySpark & Databricks cards to the central dashboard (`index.html`).
  * Appended extensive domain trees to `topic.txt` and `prompt.txt`.

## v1.0.0 - Initial Portal Launch
* **Status:** Historical
* **Commit Hash:** `4cce816`
* **Changes:**
  * Core Project initialization with massive HTML template extraction.
  * Base styling (`styles.css`) featuring glassmorphism and fully responsive layout.
  * 7 core modules generated spanning AWS, Domain, SQL, Airflow, Tableau, Behavioral, and Interview Bank.
  * Javascript engine created for dark mode, countdown timer, and progress ring.

---

### How to Revert to a Previous Version
All changes are protected in GitHub version control. To revert your codebase to an older version, open a terminal in the folder and use `git` commands.

**Option 1: Temporarily look at an older version (Safe)**
If you just want to preview v1.0.0 without destroying any current work:
```bash
git checkout 4cce816
```
To come back to the present day: `git checkout master`

**Option 2: Undo the most recent changes**
If you want to completely jump back permanently (e.g., discard v1.2.0 and go back to v1.1.0):
```bash
git reset --hard c16987e
git push --force origin master
```
*(Warning: `reset --hard` permanently destroys any local files changed since that commit).*

**Option 3: Create a safe backup branch**
If you want to revert to v1.1.0 but keep v1.2.0 saved just in case:
```bash
git checkout -b temp-backup # Save current state
git checkout master
git reset --hard c16987e
```
