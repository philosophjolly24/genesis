import JSZip from "jszip";
import { databaseAPI } from "../database/api/api";
import { saveAs } from "file-saver";
import { Dispatch, SetStateAction } from "react";
import Ajv, { JSONSchemaType, DefinedError } from "ajv";
import { schema } from "./schema";

const handleListExport = async (listId: string) => {
  // create the file object
  // data needed: list name,listId, created,updated,items
  const list = await databaseAPI.getList(listId);
  const items = await databaseAPI.getAllItemsForList(listId);
  const ExportedList = {
    list,
    items,
  };
  console.log(ExportedList);

  const zip = new JSZip();
  // generate JSON file

  if (list && items) {
    zip.file(`${list.name}.json`, JSON.stringify(ExportedList));

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      saveAs(content, `${list.name}.zip`);
    });
  }
};

const handleFileImport = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setFileName: Dispatch<SetStateAction<string>>,
  setIsImport: Dispatch<SetStateAction<boolean>>
) => {
  if (e.target.files) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (e) {
        const zipData = e.target?.result;
        try {
          const zip = await JSZip.loadAsync(zipData ?? "");
          zip.forEach(async (relPath, ZipEntry) => {
            console.log("file: ", relPath);
            setFileName(relPath);
            console.log(relPath);
            const fileData = await ZipEntry.async("text");
            console.log(JSON.parse(fileData));
            const importedList = validateJSON(fileData);

            // TODO: add to data to database
            if (importedList !== undefined)
              databaseAPI.addImportedList(importedList);
            // TODO: let users know it has been added,or deleted
            // TODO:  redirect to homepage
          });
        } catch (err) {
          console.error("Error loading ZIP file:", err);
        }
      };
      reader.readAsArrayBuffer(file);
      setIsImport(false);
    }
  }
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

function validateJSON(data: string) {
  const list = JSON.parse(data);
  if (validate(list)) {
    console.log("validated data", list);
    return list;
  } else {
    console.log(validate.errors);
  }
}
export { handleListExport, handleFileImport };
