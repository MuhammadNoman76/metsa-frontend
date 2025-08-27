import os
import pathlib

# Define directories and files to exclude
EXCLUDE_DIRS = {'.next', 'node_modules', 'ui', 'public'}
EXCLUDE_FILES = {'.env.local', '.gitignore', 'package-lock.json', 'README.md'}

# Define file extensions to document
INCLUDE_EXTENSIONS = {'.tsx', '.ts', '.jsx', '.js', '.css', '.json', '.mjs'}

def should_exclude_dir(dir_name, parent_path):
    """Check if directory should be excluded"""
    # Exclude ui folder only if it's under components
    if dir_name == 'ui' and 'components' in parent_path:
        return True
    return dir_name in EXCLUDE_DIRS

def should_exclude_file(file_name):
    """Check if file should be excluded"""
    return file_name in EXCLUDE_FILES

def get_file_extension(file_path):
    """Get file extension"""
    return pathlib.Path(file_path).suffix

def document_project(root_dir, output_file='frontend_documentation.md'):
    """Document all project files in markdown format"""
    
    with open(output_file, 'w', encoding='utf-8') as doc:
        doc.write("# Frontend Project Documentation\n\n")
        
        # Walk through directory tree
        for root, dirs, files in os.walk(root_dir):
            # Get relative path from root directory
            rel_path = os.path.relpath(root, root_dir)
            
            # Filter out excluded directories
            dirs[:] = [d for d in dirs if not should_exclude_dir(d, root)]
            
            # Process files in current directory
            for file in sorted(files):
                # Skip excluded files
                if should_exclude_file(file):
                    continue
                
                # Skip files without included extensions
                if get_file_extension(file) not in INCLUDE_EXTENSIONS:
                    continue
                
                # Get full file path
                file_path = os.path.join(root, file)
                
                # Get relative file path for documentation
                if rel_path == '.':
                    doc_path = file
                else:
                    # Use backslash for Windows-style paths as shown in example
                    doc_path = os.path.join(rel_path, file).replace('/', '\\')
                
                # Write file header
                doc.write(f"## {doc_path}\n\n")
                
                # Write file content
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    # Determine language for syntax highlighting
                    ext = get_file_extension(file)
                    lang_map = {
                        '.tsx': 'typescript',
                        '.ts': 'typescript',
                        '.jsx': 'javascript',
                        '.js': 'javascript',
                        '.json': 'json',
                        '.css': 'css',
                        '.mjs': 'javascript'
                    }
                    lang = lang_map.get(ext, '')
                    
                    doc.write(f"```{lang}\n")
                    doc.write(content)
                    doc.write("\n```\n\n")
                    
                except Exception as e:
                    doc.write(f"*Error reading file: {e}*\n\n")
        
        doc.write("\n---\n\n*Documentation generated automatically*\n")

def main():
    """Main function"""
    # Set the root directory (current directory or specify path)
    root_directory = '.'  # Change this to your project root if needed
    
    # Generate documentation
    output_filename = 'frontend_documentation.md'
    
    print(f"Documenting project from: {os.path.abspath(root_directory)}")
    print(f"Output file: {output_filename}")
    print("Excluding directories:", EXCLUDE_DIRS)
    print("Excluding files:", EXCLUDE_FILES)
    print("---")
    
    document_project(root_directory, output_filename)
    
    print(f"\nDocumentation complete! Check {output_filename}")

if __name__ == "__main__":
    main()
