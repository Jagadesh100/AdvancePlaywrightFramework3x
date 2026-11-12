import fs from 'fs';
import path from 'path';

export interface TestDataRow{
    [key:string]: string
}

export function readCSV(filePath : string): TestDataRow[]{
    let fullPath = path.resolve(filePath);
    let content = fs.readFileSync(fullPath, 'utf-8');
    let lines = content.trim().split("\n");

    // Header line
    let headers = lines[0].split(",");

    // Data lines
    let data : TestDataRow[] = [];
    for(let i=1;i<lines.length;i++){
        let values = lines[i].split(",");
        let row : TestDataRow = {};
        for(let j=0; j<headers.length; j++){
            row[headers[j].trim()] = values[j]?.trim() || "";
        }
        data .push(row);
    }
    return data;
}

/**
 * StepS:
 * 1. Decalre the Data type of a in interface
 * 2. Read the File
 * 3. Seperate the content in the file to Lines
 * 4. Split Line 1 to header
 * 5. Read the remaining lines to get the individual row
 * 6. Based on the row , iterate them and get the value and push to data
 */