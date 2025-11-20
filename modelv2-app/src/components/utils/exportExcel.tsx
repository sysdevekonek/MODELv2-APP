// How to use -> call this function in your component with appropriate parameters
// exportToExcel(
//   data,        // ← the data you want to export (array of objects)
//   filename,    // ← name of the Excel file
//   columns?,    // ← optional custom column setup
//   transform?,  // ← optional data modifier before exporting
//   sheetName?   // ← optional Excel sheet name
// )

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export interface Column {
  key: string;
  header: string;
  width?: number;
}

export async function exportToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: Column[],
  transform?: (row: T) => Partial<T>,
  sheetName: string = "Sheet1"
) {
  if (!data?.length) throw new Error("No data to export");

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  const finalColumns = columns || generateColumnsFromData(data[0]);
  worksheet.columns = finalColumns.map(col => ({
    header: col.header,
    key: col.key,
    width: col.width || 20,
  }));

  // Header styling
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE6E6E6" } };

  // Add rows
  data.forEach(row => worksheet.addRow(transform ? transform(row) : row));

  // Borders
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      if (cell.value === undefined || cell.value === null) cell.value = ""; // force render
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });
  
  // Auto-fit columns
  worksheet.eachRow({ includeEmpty: true }, (row, rowNum) => {
    row.height = 20; // fixed height (adjust if needed)
  
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.alignment = {
        vertical: "middle",
        horizontal: rowNum === 1 ? "center" : "left",
        wrapText: false, // disable text wrapping to allow dynamic width
      };
    });
  });

  worksheet.columns.forEach((col) => {
    let maxLength = 0;
    col?.eachCell?.({ includeEmpty: true }, (cell) => {
      const len = (cell.value ?? "").toString().length;
      if (len > maxLength) maxLength = len;
    });
    // Add right padding for readability
    col.width = Math.max(maxLength + 4, 12);
  });
  
  

  const buffer = await workbook.xlsx.writeBuffer();
  const safeFilename = filename.replace(/[<>:"/\\|?*]+/g, "_");
  saveAs(new Blob([buffer]), `${safeFilename}.xlsx`);
}

const generateColumnsFromData = (firstRow: any): Column[] =>
  Object.keys(firstRow ?? {}).map((key) => ({
    key,
    header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
    width: 20,
  }));
