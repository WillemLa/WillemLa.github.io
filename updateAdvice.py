import os
import re

def update_advice_in_js(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find tdAdvice value
    td_advice_match = re.search(r'tdAdvice:\s*"([^"]*)"', content)
    if not td_advice_match:
        print(f'Skipped (no tdAdvice): {file_path}')
        return False
    td_advice = td_advice_match.group(1)

    # Check if advice field exists
    if 'advice:' not in content:
        print(f'Skipped (no advice field): {file_path}')
        return False

    # Replace advice array with tdAdvice value
    new_advice = f'advice: [\n    "{td_advice}",\n  ],'
    content_updated = re.sub(r'advice:\s*\[[^\]]*?\],', new_advice, content, flags=re.DOTALL)

    # Save changes
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content_updated)
    print(f'✅ Updated: {file_path}')
    return True

def process_js_files(base_dir='students/data'):
    for root, dirs, files in os.walk(base_dir):
        if 'testDebug' in root:
            for file in files:
                if file.endswith('.js'):
                    file_path = os.path.join(root, file)
                    update_advice_in_js(file_path)

process_js_files()