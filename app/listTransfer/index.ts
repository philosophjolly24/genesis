import JSZip from "jszip";
import { databaseAPI, ListSchema, Trash } from "../database/api/api";
import { saveAs } from "file-saver";
import { Dispatch, SetStateAction } from "react";
import Ajv from "ajv";
import { schema } from "./schema";
import { notify } from "../util/notify";

const handleListExport = async (listId: string) => {
  // create the file object
  // data needed: list name,listId, created,updated,items
  const list = await databaseAPI.getList(listId);
  const items = await databaseAPI.getAllItemsForList(listId);
  const ExportedList = {
    list,
    items,
  };

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
            setFileName(relPath);
            const fileData = await ZipEntry.async("text");
            const importedList = validateJSON(fileData);

            if (importedList !== undefined)
              databaseAPI.addImportedList(importedList);
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
    return list;
  } else {
    notify.error("Validation error: could not validate list");
    console.log(validate.errors);
  }
}

const handleListDelete = async (listID: string) => {
  await databaseAPI.deleteList(listID);
};

const handleListRestore = async (list: ListSchema, listID: string) => {
  await databaseAPI.restoreList(list, listID);
};
export {
  handleListExport,
  handleFileImport,
  handleListDelete,
  handleListRestore,
};
