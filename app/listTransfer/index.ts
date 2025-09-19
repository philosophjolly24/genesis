import JSZip from "jszip";
import { databaseAPI } from "../database/api/api";
import { saveAs } from "file-saver";

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
    // zip file
    // allow the user to download the fil}
  }
};

const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const content = await ZipEntry.async("text");
            // TODO: add to data to database
            // TODO: let users know it has been added,or deleted
            // TODO:  redirect to homepage
            console.log(JSON.parse(content));
          });
        } catch (err) {
          console.error("Error loading ZIP file:", err);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
};

export { handleListExport, handleFileImport };
