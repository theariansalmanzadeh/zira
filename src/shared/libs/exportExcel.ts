import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type ExcelColumn<T> = {
  header: string;
  key: keyof T;
  width?: number;
};

const toSheetName = (fileName: string) =>
  `${fileName}${new Date().toString()}`
    .replace(/[\\/?*[\]:]/g, "-")
    .slice(0, 31);

export async function exportToExcel<T extends Record<string, any>>(
  data: T[],
  columns: ExcelColumn<T>[],
  fileName = "export.xlsx",
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(toSheetName(fileName));

  worksheet.columns = columns.map((column) => ({
    header: column.header,
    key: column.key as string,
    width: column.width ?? 20,
  }));

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  const headerRow = worksheet.getRow(1);

  headerRow.font = {
    bold: true,
  };

  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "FFD9E1F2",
    },
  };

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(new Blob([buffer]), fileName);
}
