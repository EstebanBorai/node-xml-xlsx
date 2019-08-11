# node-xml-xlsx / templates
> Collection of XML files corresponding to the XLSX.

## XLSX Container Structure
A XLSX file is basically a ZIP file containing meta files and data files.
The structure of a XLSX file is the following:
```
.
├── [Content_Types].xml       # [XML] All references to the XML files included in the package are referenced in this XML file
├── _rels                     # [Folder] Relationships folder
│   ├── .rels                 # [XML] Stores the package-level relationships.
├── docProps                  # [Folder] Document Properties folder
│   ├── app.xml               # [XML] Stores information about the content of the file.
│   ├── core.xml              # [XML] Stores information like: author, date created, saved and modified.
├── xl                        # [Folder] Contains all the details about the contents of the workbook.
│   ├── _rels                 # [Folder] Stores workbook relationships, Eg: Worksheets.
│      ├── workbook.xml.rels  # [XML] Stores worbook/woksheet relationships
│      ├── workbook.xml.rels  # [XML] Stores worbook/woksheet relationships
│   ├── worksheets            # [Folder] Stores workbook worksheets and worksheets data
│      ├── sheet1.xml         # [XML] Sample sheet file, contains a Worksheet data
├── sharedStrings.xml         # [XML] Space saving mechanism, keeps track string values and saves it once.
├── styles.xml                # [XML] Available styles for the XLSX file
├── workbook.xml              # [XML] Workbook/Worksheet relationship data
```

## References
[FileFormat - XLSX - Excel Open XML Spreadsheet](https://wiki.fileformat.com/specification/spreadsheet/xlsx/)
