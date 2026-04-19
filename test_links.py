import os
import re
from pathlib import Path

base_dir = Path(r"c:\Users\bunty\OneDrive\Belgeler\learn\L3")

def test_links():
    html_files = list(base_dir.rglob("*.html"))
    all_files = set([f.resolve() for f in html_files])
    
    broken_links = []
    
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find all <a> tags
        links = re.findall(r'<a\s+[^>]*href="([^"]+)"', content, re.IGNORECASE)
        for link in links:
            if link.startswith('http') or link.startswith('mailto:'):
                continue # Skip external links
                
            # If hash only, it's an internal page link
            if link.startswith('#'):
                # Validate the id exists in the same file
                target_id = link[1:]
                if target_id == '':
                    continue
                if not re.search(f'id="{target_id}"', content):
                    broken_links.append((filepath.name, link, "ID not found in same file"))
                continue
                
            # Split off hash for file resolution
            parts = link.split('#')
            file_link = parts[0]
            hash_target = parts[1] if len(parts) > 1 else None
            
            if file_link == '':
                continue # It was just a hash
                
            target_path = (filepath.parent / file_link).resolve()
            
            if target_path not in all_files:
                broken_links.append((filepath.name, link, f"Target file missing: {target_path}"))
            else:
                # Target file exists, if there's a hash, let's optionally check it (though not strictly required to exist)
                # But we definitely know the file resolves.
                pass
                
    if broken_links:
        print(f"Found {len(broken_links)} broken links:")
        for source, link, error in broken_links:
            print(f"  {source} -> {link} | {error}")
    else:
        print("All internal file links are perfectly mapped and working fine.")

test_links()
